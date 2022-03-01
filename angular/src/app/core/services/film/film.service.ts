import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
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
import { getQueryConstraint } from './utils/get-query-constraint';
import { FilterOptions, PaginationDirection, QueryCursorId, SortOptions } from './utils/types';

const INITIAL_PAGE = PaginationDirection.Next;
const INITIAL_SEARCH_TEXT = null;
const INITIAL_SORT_OPTIONS = null;

/** Film service. */
@Injectable({
  providedIn: 'root',
})
export class FilmService {

  /** Films. */
  public readonly films$: Observable<Film[]>;

  // Fetch options
  private readonly page$ = new BehaviorSubject<PaginationDirection | null>(INITIAL_PAGE);

  private readonly searchText$ = new BehaviorSubject<FilterOptions['searchText'] | null>(INITIAL_SEARCH_TEXT);

  private readonly sortOptions$ = new BehaviorSubject<SortOptions | null>(INITIAL_SORT_OPTIONS);

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
    this.films$ = this.page$.pipe(
      combineLatestWith(
        this.sortOptions$.pipe(distinctUntilChanged()),
        this.searchText$.pipe(distinctUntilChanged(), debounceTime(300)),
      ),
      map(([paginationDirection, sortOptions, searchText]) => ({
        paginationDirection, sortOptions, searchText,
      })),
      debounceTime(300),
      mergeMap(filter => this.getFilmsPage(filter)),
    );
  }

  /**
   * Get films.
   * @param filters Filters.
   */
  private getFilmsPage(filters?: FilterOptions): Observable<Film[]> {
    const paginationDirection = filters?.paginationDirection ?? INITIAL_PAGE;
    const searchText = filters?.searchText ?? INITIAL_SEARCH_TEXT;
    const sortOptions = filters?.sortOptions ?? INITIAL_SORT_OPTIONS;

    return this.firestoreService.getQueryCursorById(
      'films',
      paginationDirection === PaginationDirection.Next ? this.forwardQueryCursorId : this.backwardQueryCursorId,
    ).pipe(
      tap(v => console.log(v)),
      switchMap(queryCursor => this.firestoreService.fetchMany<FilmDto>(
        'films',
        getQueryConstraint({
          count: FILMS_PER_PAGE + 1,
          queryCursor,
          paginationDirection,
          searchText,
          sortOptions,
        }),
      )),
      tap(v => console.log(v)),
      map(filmDtos => filmDtos.map(this.filmMapper.fromDto)),
      tap(films => this.updatePagination(films, paginationDirection)),
      map(films => {
        if (films.length - 1 < FILMS_PER_PAGE) {
          return films;
        }
        if (paginationDirection === PaginationDirection.Next) {
          return films.slice(0, -1);
        }
        return films.slice(1);
      }),
    );
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
    this.page$.next(PaginationDirection.Next);
  }

  /**
   * Set search text.
   *
   * Incompatible with sorting, will reset sorting and pagination!
   * @param text Search text.
   */
  public setSearchText(text: string | null): void {
    this.searchText$.next(text);
    this.sortOptions$.next(null);
    this.resetPagination();
  }

  /**
   * Set sort options.
   *
   * Incompatible with search, will reset search and pagination!
   * @param sortOptions Sort options.
   */
  public setSortOptions(sortOptions: SortOptions): void {
    this.sortOptions$.next(sortOptions);
    this.searchText$.next(null);
    this.resetPagination();
  }

  /**
   * Change page.
   * @param paginationDirection Pagination direction.
   */
  public changePage(paginationDirection: PaginationDirection): void {
    this.page$.next(paginationDirection);
  }
}
