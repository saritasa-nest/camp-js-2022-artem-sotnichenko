import { Injectable } from '@angular/core';
import { endAt, limit, limitToLast, orderBy, QueryConstraint, startAt, where } from 'firebase/firestore';
import { map, Observable, switchMap } from 'rxjs';

import { Film } from '../../models/film';
import { FirestoreService } from '../firestore/firestore.service';
import { SortDirection, SortField } from '../firestore/utils/types';
import { FilmDto } from '../mappers/dto/film.dto';
import { FilmMapper } from '../mappers/film.mapper';

import { FilmCursor, FilterOptions, PaginationDirection, QueryCursor, SortOptions } from './utils/types';

type GetCursorOptions = {
  readonly searchText: string;
  readonly sortOptions: null;
} | {
  readonly searchText: null;
  readonly sortOptions: SortOptions;
} | {
  readonly searchText: null;
  readonly sortOptions: null;
};

/** Fetch films options. */
export interface FetchFilmsOptions extends FilterOptions {

  /** Items count per page. */
  readonly count: number;

  /** Query cursor. */
  readonly queryCursor: QueryCursor;

  /** Pagination direction. */
  readonly paginationDirection: PaginationDirection;
}

const INITIAL_FILTER_OPTIONS = {
  searchText: null,
  sortOptions: null,
};

const DEFAULT_SORT_FIELD = SortField.Title;
const DEFAULT_SORT_DIRECTION = SortDirection.Ascending;
const DEFAULT_SEARCH_FIELD = SortField.Title;
const FIREBASE_SEARCH_SYMBOL = '~';

/** Film service. */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {

  public constructor(
    private readonly filmMapper: FilmMapper,
    private readonly firestoreService: FirestoreService,
  ) { }

  /**
   * Get cursor.
   * `searchText` is exclusive with `sortOptions`, if provided both `sortOptions` will overwrite.
   * @param options Cursor options.
   */
  public getCursor(options: GetCursorOptions = INITIAL_FILTER_OPTIONS): FilmCursor {
    const { searchText, sortOptions } = options;
    return {
      entityId: null,
      paginationDirection: PaginationDirection.Next,
      searchText,
      sortOptions,
    };
  }

  /**
   * Get films.
   * @param count Films count.
   * @param cursor Cursor to fetch with.
   */
  public getFilms(count: number, cursor: FilmCursor): Observable<Film[]> {
    const {
      entityId,
      paginationDirection,
      searchText,
      sortOptions,
    } = cursor;

    return this.firestoreService.getQueryCursorById(
      'films',
      entityId,
    ).pipe(
      switchMap(queryCursor => this.fetchFilms({
        count,
        queryCursor,
        paginationDirection,
        searchText,
        sortOptions,
      })),
      map(filmDtos => filmDtos.map(dto => this.filmMapper.fromDto(dto))),
    );
  }

  private fetchFilms(options: FetchFilmsOptions): Observable<FilmDto[]> {
    return this.firestoreService.getMany<FilmDto>(
      'films',
      this.getQueryConstraints({
        count: options.count,
        queryCursor: options.queryCursor,
        paginationDirection: options.paginationDirection,
        searchText: options.searchText,
        sortOptions: options.sortOptions,
      }),
    );
  }

  /**
   * Get query constraint, for use in firestore query.
   * @param options Options.
   */
  private getQueryConstraints({
    count,
    queryCursor,
    paginationDirection,
    searchText,
    sortOptions,
  }: FetchFilmsOptions): readonly QueryConstraint[] {
    const constraints: QueryConstraint[] = [];

    if (paginationDirection === PaginationDirection.Next) {
      constraints.push(limit(count));
    } else {
      constraints.push(limitToLast(count));
    }

    if (sortOptions !== null) {
      constraints.push(orderBy(sortOptions.field, sortOptions.direction));
    } else {
      if (searchText !== null) {
        constraints.push(
          where(DEFAULT_SEARCH_FIELD, '>=', searchText),
          where(DEFAULT_SEARCH_FIELD, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
        );
      }
      constraints.push(orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_DIRECTION));
    }

    if (queryCursor !== null) {
      if (paginationDirection === PaginationDirection.Next) {
        constraints.push(startAt(queryCursor));
      } else {
        constraints.push(endAt(queryCursor));
      }
    }

    return constraints;
  }
}
