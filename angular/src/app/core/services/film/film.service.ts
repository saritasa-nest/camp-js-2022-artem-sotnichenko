import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatestWith,
  debounceTime,
  map,
  mergeMap,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

import { Film } from '../../models/film';
import { FILMS_PER_PAGE } from '../../utils/constants';
import { FirestoreService } from '../firestore/firestore.service';
import { FilmDto } from '../mappers/dto/film.dto';
import { FilmMapper } from '../mappers/film.mapper';

import { getPageStatus } from './utils/get-page-status';
import { getQueryConstraint, GetQueryConstraintOptions } from './utils/get-query-constraint';
import { FetchOptions, PaginationDirection, QueryCursor, QueryCursorId, SortOptions } from './utils/types';

const INITIAL_PAGINATION_DIRECTION = PaginationDirection.Next;
const INITIAL_SEARCH_TEXT = null;
const INITIAL_SORT_OPTIONS = null;
const INITIAL_FILTER_OPTIONS: FetchOptions = {
  searchText: INITIAL_SEARCH_TEXT,
  sortOptions: INITIAL_SORT_OPTIONS,
  paginationDirection: INITIAL_PAGINATION_DIRECTION,
};

/** Film service. */
@Injectable({
  providedIn: 'root',
})
export class FilmService {

  /** Films. */
  public readonly films$: Observable<Film[]>;

  // Fetch options
  private readonly fetchOptions$ = new BehaviorSubject<FetchOptions>(INITIAL_FILTER_OPTIONS);

  private readonly paginationDirection$ = new BehaviorSubject<PaginationDirection>(INITIAL_PAGINATION_DIRECTION);

  // Pagination flags
  private readonly isFirstPageSubject$ = new BehaviorSubject(true);

  private readonly isLastPageSubject$ = new BehaviorSubject(true);

  /** Whether it is a first page. */
  public readonly isFirstPage$ = this.isFirstPageSubject$.asObservable();

  /** Whether it is a last page. */
  public readonly isLastPage$ = this.isLastPageSubject$.asObservable();

  /** Cursor to fetch films backward of it. */
  private backwardQueryCursorId: QueryCursorId = null;

  /** Cursor to fetch films forward of it. */
  private forwardQueryCursorId: QueryCursorId = null;

  public constructor(
    private readonly filmMapper: FilmMapper,
    private readonly firestoreService: FirestoreService,
  ) {
    this.films$ = this.paginationDirection$.pipe(
      combineLatestWith(this.fetchOptions$),
      map(([paginationDirection, fetchOptions]) => ({ ...fetchOptions, paginationDirection })),
      debounceTime(300),
      mergeMap(fetchOptions => this.getFilmsPage(fetchOptions)),
    );
  }

  /**
   * Set search text.
   *
   * Incompatible with sorting, will reset sorting and pagination!
   * @param searchText Search text.
   */
  public setSearchText(searchText: string | null): void {
    this.resetPagination();
    this.fetchOptions$.next({
      searchText,
      sortOptions: null,
      paginationDirection: INITIAL_PAGINATION_DIRECTION,
    });
  }

  /**
   * Set sort options.
   *
   * Incompatible with search, will reset search and pagination!
   * @param sortOptions Sort options.
   */
  public setSortOptions(sortOptions: SortOptions | null): void {
    this.fetchOptions$.next({
      searchText: null,
      sortOptions,
      paginationDirection: INITIAL_PAGINATION_DIRECTION,
    });
    this.resetPagination();
  }

  /**
   * Change page.
   * @param paginationDirection Pagination direction.
   */
  public changePage(paginationDirection: PaginationDirection): void {
    this.paginationDirection$.next(paginationDirection);
  }

  /**
   * Get films.
   * @param fetchOptions Fetch options.
   */
  private getFilmsPage(fetchOptions: FetchOptions): Observable<Film[]> {
    const {
      paginationDirection,
      searchText,
      sortOptions,
    } = fetchOptions;

    return this.getFilmQueryCursor(paginationDirection)
      .pipe(
        switchMap(queryCursor => this.fetchFilms({
          queryCursor,
          paginationDirection,
          searchText,
          sortOptions,
        })),
        map(filmDtos => filmDtos.map(this.filmMapper.fromDto)),
        tap(films => this.updatePagination(films, paginationDirection)),
        map(films => this.parseFilmsPage(films, paginationDirection)),
      );
  }

  private getFilmQueryCursor(paginationDirection: PaginationDirection): Observable<QueryCursor> {
    return this.firestoreService.getQueryCursorById(
      'films',
      paginationDirection === PaginationDirection.Next ? this.forwardQueryCursorId : this.backwardQueryCursorId,
    );
  }

  private fetchFilms(options: Omit<GetQueryConstraintOptions, 'count'>): Observable<FilmDto[]> {
    return this.firestoreService.fetchMany<FilmDto>(
      'films',
      getQueryConstraint({
        count: FILMS_PER_PAGE + 1,
        queryCursor: options.queryCursor,
        paginationDirection: options.paginationDirection,
        searchText: options.searchText,
        sortOptions: options.sortOptions,
      }),
    );
  }

  private parseFilmsPage(films: Film[], paginationDirection: PaginationDirection): Film[] {
    if (films.length - 1 < FILMS_PER_PAGE) {
      return films;
    }
    if (paginationDirection === PaginationDirection.Next) {
      return films.slice(0, -1);
    }
    return films.slice(1);
  }

  private updatePagination(films: Film[], paginationDirection: PaginationDirection): void {
    const { isFirstPage, isLastPage } = getPageStatus({
      filmsLength: films.length,
      paginationDirection,
      filmsPerPage: FILMS_PER_PAGE,
      backwardQueryCursorId: this.backwardQueryCursorId,
      forwardQueryCursorId: this.forwardQueryCursorId,
    });

    this.isFirstPageSubject$.next(isFirstPage);
    this.isLastPageSubject$.next(isLastPage);

    if (paginationDirection === PaginationDirection.Next) {
      if (films.length - 1 < FILMS_PER_PAGE) {
        this.forwardQueryCursorId = null;
      } else {
        this.forwardQueryCursorId = films[films.length - 1].id;
      }
      this.backwardQueryCursorId = films[0].id;
    } else if (films.length - 1 < FILMS_PER_PAGE) {
      this.forwardQueryCursorId = this.backwardQueryCursorId;
      this.backwardQueryCursorId = null;
    } else {
      this.backwardQueryCursorId = films[1].id;
      this.forwardQueryCursorId = films[films.length - 1].id;
    }
  }

  private resetPagination(): void {
    this.backwardQueryCursorId = null;
    this.forwardQueryCursorId = null;
    this.paginationDirection$.next(PaginationDirection.Next);
  }
}
