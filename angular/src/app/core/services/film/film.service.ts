import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getDocs, query } from 'firebase/firestore';
import {
  BehaviorSubject,
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  Observable,
} from 'rxjs';

import { Film } from '../../models/film';
import { FILMS_PER_PAGE } from '../../utils/constants';
import { getCollection } from '../../utils/firebase/get-collection-typed';
import { FilmDocument } from '../mappers/dto/film.dto';
import { FilmMapper } from '../mappers/film.mapper';

import { getQueryCursorById } from './utils/get-cursor-by-id';
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

  private readonly filters$: Observable<FilterOptions>;

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
    private readonly db: Firestore,
    private readonly filmMapper: FilmMapper,
  ) {
    this.filters$ = this.page$.pipe(
      combineLatestWith(
        this.sortOptions$.pipe(distinctUntilChanged()),
        this.searchText$.pipe(distinctUntilChanged(), debounceTime(300)),
      ),
      map(([paginationDirection, sortOptions, searchText]) => ({
        paginationDirection, sortOptions, searchText,
      })),
    );

    this.films$ = this.filters$.pipe(
      debounceTime(300),
      mergeMap(filter => this.getFilms(filter)),
    );
  }

  /**
   * Get films.
   * @param filters Filters.
   */
  public async getFilms(filters?: FilterOptions): Promise<Film[]> {
    const paginationDirection = filters?.paginationDirection ?? INITIAL_PAGE;
    const searchText = filters?.searchText ?? INITIAL_SEARCH_TEXT;
    const sortOptions = filters?.sortOptions ?? INITIAL_SORT_OPTIONS;

    const queryCursor = paginationDirection === PaginationDirection.Next ?
      await getQueryCursorById(this.db, this.forwardQueryCursorId) :
      await getQueryCursorById(this.db, this.backwardQueryCursorId);

    // Fetching one more film to know if next page is exist.
    const filmQuery = query(
      getCollection<FilmDocument>(this.db, 'films'),
      ...getQueryConstraint({
        count: FILMS_PER_PAGE + 1,
        queryCursor,
        paginationDirection,
        searchText,
        sortOptions,
      }),
    );
    const filmsSnapshot = await getDocs(filmQuery);
    const films = filmsSnapshot.docs.map(this.filmMapper.fromDoc);

    this.updatePagination(films, paginationDirection);

    let filmsPage;
    if (films.length - 1 < FILMS_PER_PAGE) {
      filmsPage = films;
    } else if (paginationDirection === PaginationDirection.Next) {
      filmsPage = films.slice(0, -1);
    } else {
      filmsPage = films.slice(1);
    }
    return filmsPage;
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
    this.resetPagination();
    this.sortOptions$.next(null);

    this.searchText$.next(text);
  }

  /**
   * Set sort options.
   *
   * Incompatible with search, will reset search and pagination!
   * @param sortOptions Sort options.
   */
  public setSortOptions(sortOptions: SortOptions): void {
    this.resetPagination();
    this.searchText$.next(null);

    this.sortOptions$.next(sortOptions);
  }

  /**
   * Change page.
   * @param paginationDirection Pagination direction.
   */
  public changePage(paginationDirection: PaginationDirection): void {
    this.page$.next(paginationDirection);
  }
}
