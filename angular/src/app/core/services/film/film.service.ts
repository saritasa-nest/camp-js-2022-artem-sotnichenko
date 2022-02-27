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
import { FilmDto } from '../mappers/dto/film.dto';
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

  private searchString$ = new BehaviorSubject<FilterOptions['searchText'] | null>(INITIAL_SEARCH_STRING);

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

  public constructor(
    private readonly db: Firestore,
    private readonly filmMapper: FilmMapper,
  ) {
    this.filters$ = this.page$.pipe(
      distinctUntilChanged(),
      combineLatestWith(
        this.sortOptions$,
        this.searchString$.pipe(debounceTime(300)),
      ),
      map(([paginationDirection, sortOptions, searchText]) => ({
        paginationDirection, sortOptions, searchText,
      })),
      debounceTime(100),
    );

    this.films$ = this.filters$.pipe(
      mergeMap(filter => this.getFilms(filter)),
    );
  }

  /**
   * Get films.
   * @param filters Filters.
   *
   * TODO: Fix backwards pagination.
   */
  public async getFilms(filters?: FilterOptions): Promise<Film[]> {
    const paginationDirection = filters?.paginationDirection ?? INITIAL_PAGE;
    const searchText = filters?.searchText ?? INITIAL_SEARCH_STRING;
    const sortOptions = filters?.sortOptions ?? INITIAL_SORT_OPTIONS;

    const queryCursor = paginationDirection === PaginationDirection.Next ?
      await getQueryCursorById(this.db, this.lastQueryCursorId) :
      await getQueryCursorById(this.db, this.firstQueryCursorId);

    const filmQuery = query(
      getCollection<FilmDto>(this.db, 'films'),
      ...getQueryConstraint({
        count: FILMS_PER_PAGE + 1,
        queryCursor,
        paginationDirection,
        searchText,
        sortOptions,
      }),
    );
    const filmsSnapshot = await getDocs(filmQuery);
    const films = filmsSnapshot.docs
      .map(d => ({ ...d.data(), id: d.id }))
      .map(this.filmMapper.fromDto);

    let filmsPage;
    if (films.length - 1 < FILMS_PER_PAGE) {
      filmsPage = films;
    } else if (paginationDirection === PaginationDirection.Next) {
      filmsPage = films.slice(0, -1);
    } else {
      filmsPage = films.slice(1);
    }

    // console.log('# old');
    // let firstQueryCursorId = await getCursorById(this.db, this.firstQueryCursorId);
    // console.log('firstQueryCursorId', firstQueryCursorId ? firstQueryCursorId.data()?.fields.title : '');
    // let lastQueryCursorId = await getCursorById(this.db, this.lastQueryCursorId);
    // console.log('lastQueryCursorId', lastQueryCursorId ? lastQueryCursorId.data()?.fields.title : '');

    this.setPageData(films, paginationDirection);

    // console.log('# new');
    // firstQueryCursorId = await getCursorById(this.db, this.firstQueryCursorId);
    // console.log('firstQueryCursorId', firstQueryCursorId ? firstQueryCursorId.data()?.fields.title : '');
    // lastQueryCursorId = await getCursorById(this.db, this.lastQueryCursorId);
    // console.log('lastQueryCursorId', lastQueryCursorId ? lastQueryCursorId.data()?.fields.title : '');

    return filmsPage;
  }

  private setPageData(films: Film[], paginationDirection: PaginationDirection): void {
    this.isLastPageSubject$.next(this.lastQueryCursorId === null && paginationDirection !== PaginationDirection.Next);
    this.isFirstPageSubject$.next(this.firstQueryCursorId === null && paginationDirection !== PaginationDirection.Prev);

    if (films.length - 1 < FILMS_PER_PAGE) {
      if (paginationDirection === PaginationDirection.Next) {
        this.isLastPageSubject$.next(true);

        this.firstQueryCursorId = this.lastQueryCursorId;
        this.lastQueryCursorId = films[films.length - 1].id;
      } else {
        this.isFirstPageSubject$.next(true);

        this.lastQueryCursorId = this.firstQueryCursorId;
        this.firstQueryCursorId = films[0].id;
      }
    } else {
      this.firstQueryCursorId = films[0].id;
      this.lastQueryCursorId = films[films.length - 1].id;
    }
  }

  /**
   * Set search text.
   *
   * Incompatible with sorting, will reset sorting and pagination!
   * @param text Search text.
   */
  public setSearchText(text: string | null): void {
    this.firstQueryCursorId = null;
    this.lastQueryCursorId = null;

    this.sortOptions$.next(null);
    this.searchString$.next(text);
  }

  /**
   * Set sort options.
   *
   * Incompatible with search, will reset search and pagination!
   * @param sortOptions Sort options.
   */
  public setSortOptions(sortOptions: SortOptions): void {
    this.firstQueryCursorId = null;
    this.lastQueryCursorId = null;

    this.searchString$.next(null);
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
