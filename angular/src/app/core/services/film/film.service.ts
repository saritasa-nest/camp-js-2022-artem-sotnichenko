import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getDocs, query } from 'firebase/firestore';
import {
  BehaviorSubject,
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
  ignoreElements,
  map,
  merge,
  mergeMap,
  Observable,
  tap,
} from 'rxjs';

import { Film } from '../../models/film';
import { FILMS_PER_PAGE } from '../../utils/constants';
import { getCollection } from '../../utils/firebase/get-collection-typed';
import { FilmDocument } from '../mappers/dto/film.dto';
import { FilmMapper } from '../mappers/film.mapper';

import { getQueryCursorById } from './utils/get-cursor-by-id';
import { getQueryConstraint } from './utils/get-query-constraint';
import { FilterOptions, PaginationDirection, SortOptions } from './utils/types';

const INITIAL_PAGE = PaginationDirection.Next;
const INITIAL_SEARCH_STRING = null;
const INITIAL_SORT_OPTIONS = null;

/** Film id or null. */
type QueryCursorId = string | null;

/** Film service. */
@Injectable({
  providedIn: 'root',
})
export class FilmService {

  /** Films. */
  public films$: Observable<Film[]>;

  private filters$: Observable<FilterOptions>;

  // Fetch options
  private page$ = new BehaviorSubject<PaginationDirection | null>(INITIAL_PAGE);

  private searchText$ = new BehaviorSubject<FilterOptions['searchText'] | null>(INITIAL_SEARCH_STRING);

  private sortOptions$ = new BehaviorSubject<SortOptions | null>(INITIAL_SORT_OPTIONS);

  // Pagination flags
  private isFirstPageSubject$ = new BehaviorSubject(true);

  private isLastPageSubject$ = new BehaviorSubject(true);

  /** Whether it first page. */
  public readonly isFirstPage$ = this.isFirstPageSubject$.asObservable();

  /** Whether it last page. */
  public readonly isLastPage$ = this.isLastPageSubject$.asObservable();

  private firstQueryCursorId: QueryCursorId = null;

  private lastQueryCursorId: QueryCursorId = null;

  private currentPageQueryCursorTitles: QueryCursorId[] = [];

  private currentPageQueryCursorIds: QueryCursorId[] = [];

  private queryCursorId: QueryCursorId = null;

  public constructor(
    private readonly db: Firestore,
    private readonly filmMapper: FilmMapper,
  ) {
    const resetSortOptionsSideEffect$ = this.searchText$.pipe(
      distinctUntilChanged(),
      tap(() => this.sortOptions$.next(null)),
    );

    const resetSearchTextSideEffect$ = this.sortOptions$.pipe(
      distinctUntilChanged(),
      tap(() => this.searchText$.next(null)),
    );

    merge(
      resetSortOptionsSideEffect$,
      resetSearchTextSideEffect$,
    )
      .pipe(
        tap(() => this.resetPagination()),
        ignoreElements(),
      )
      .subscribe();

    this.filters$ = this.page$.pipe(
      combineLatestWith(
        this.sortOptions$.pipe(distinctUntilChanged()),
        this.searchText$.pipe(distinctUntilChanged(), debounceTime(300)),
      ),
      tap(v => console.log('comb', v)),

      map(([paginationDirection, sortOptions, searchText]) => ({
        paginationDirection, sortOptions, searchText,
      })),
    );

    this.films$ = this.filters$.pipe(
      tap(v => console.log('filters', v)),
      debounceTime(500),
      mergeMap(filter => this.getFilms(filter)),
      tap(v => console.log('films', v.map(el => el.title))),
    );
  }

  /**
   * Get films.
   * @param filters Filters.
   *
   * TODO: Fix backwards pagination.
   */
  public async getFilms(filters?: FilterOptions): Promise<Film[]> {
    console.log('getting films');
    const paginationDirection = filters?.paginationDirection ?? INITIAL_PAGE;
    const searchText = filters?.searchText ?? INITIAL_SEARCH_STRING;
    const sortOptions = filters?.sortOptions ?? INITIAL_SORT_OPTIONS;

    console.log(this.lastQueryCursorId, this.firstQueryCursorId);
    console.log(paginationDirection);

    const queryCursor = paginationDirection === PaginationDirection.Next ?
      await getQueryCursorById(this.db, this.lastQueryCursorId) :
      await getQueryCursorById(this.db, this.firstQueryCursorId);

    console.log('q', queryCursor);

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

    console.log('all films', films.map(el => el.title));

    let filmsPage;
    if (films.length - 1 < FILMS_PER_PAGE) {
      filmsPage = films;
    } else if (paginationDirection === PaginationDirection.Next) {
      filmsPage = films.slice(0, -1);
    } else {
      filmsPage = films.slice(1);
    }

    this.setPageData(films, paginationDirection);

    return filmsPage;
  }

  private setPageData(films: Film[], paginationDirection: PaginationDirection): void {
    console.log('set page data');
    if (films.length === 0) {
      this.isLastPageSubject$.next(true);
      this.isFirstPageSubject$.next(true);
      return;
    }

    let isFirstPage = this.firstQueryCursorId === null && paginationDirection !== PaginationDirection.Prev;
    let isLastPage = false;

    if (paginationDirection === PaginationDirection.Next) {
      if (films.length - 1 < FILMS_PER_PAGE) {
        isLastPage = true;
        this.lastQueryCursorId = null;
      } else {
        this.lastQueryCursorId = films[films.length - 1].id;
      }

      this.firstQueryCursorId = films[0].id;
    } else if (films.length - 1 < FILMS_PER_PAGE) {
      isFirstPage = true;

      this.lastQueryCursorId = this.firstQueryCursorId;
      this.firstQueryCursorId = null;
    } else {
      this.firstQueryCursorId = films[1].id;
      this.lastQueryCursorId = films[films.length - 1].id;
    }

    this.currentPageQueryCursorTitles = films.map(film => film.title);
    this.currentPageQueryCursorIds = films.map(film => film.id);

    this.isFirstPageSubject$.next(isFirstPage);
    this.isLastPageSubject$.next(isLastPage);
  }

  private resetPagination(): void {
    console.log('reset pagination');
    this.firstQueryCursorId = null;
    this.lastQueryCursorId = null;
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
  }

  /**
   * Set sort options.
   *
   * Incompatible with search, will reset search and pagination!
   * @param sortOptions Sort options.
   */
  public setSortOptions(sortOptions: SortOptions): void {
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
