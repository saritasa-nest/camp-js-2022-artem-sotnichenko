import { Injectable } from '@angular/core';
import { endAt, limit, limitToLast, orderBy, QueryConstraint, startAt, where } from 'firebase/firestore';
import {
  map,
  Observable,
  switchMap,
} from 'rxjs';

import { Film } from '../../models/film';
import { FirestoreService } from '../firestore/firestore.service';
import { FilmDto } from '../mappers/dto/film.dto';
import { FilmMapper } from '../mappers/film.mapper';

import { FilmCursor, PaginationDirection, QueryCursor, SortDirection, SortField, SortOptions } from './utils/types';

type GetCursorOptions = {
  searchText: string;
  sortOptions: null;
} | {
  searchText: null;
  sortOptions: SortOptions;
} | {
  searchText: null;
  sortOptions: null;
};

/** `getQueryConstraint` options. */
export interface GetQueryConstraintOptions {

  /** Items count per page. */
  readonly count: number;

  /** Query cursor. */
  readonly queryCursor: QueryCursor;

  /** Whether it fetch after or before query cursor. */
  readonly paginationDirection: PaginationDirection;

  /** Search text. */
  readonly searchText: string | null;

  /** Sort options. */
  readonly sortOptions: SortOptions | null;
}

const INITIAL_FILTER_OPTIONS = {
  searchText: null,
  sortOptions: null,
};

const DEFAULT_SORT_FIELD = SortField.Title;
const DEFAULT_SORT_DIRECTION = SortDirection.Ascending;
const SEARCH_FIELD = SortField.Title;
const FIREBASE_SEARCH_SYMBOL = '~';

/** Film service. */
@Injectable({
  providedIn: 'root',
})
export class FilmService {

  public constructor(
    private readonly filmMapper: FilmMapper,
    private readonly firestoreService: FirestoreService,
  ) {}

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
  public getFilms(count: number, cursor: FilmCursor): Observable<readonly Film[]> {
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

  private fetchFilms(options: GetQueryConstraintOptions): Observable<readonly FilmDto[]> {
    return this.firestoreService.fetchMany<FilmDto>(
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
  }: GetQueryConstraintOptions): QueryConstraint[] {
    const constraints: QueryConstraint[] = [];

    if (paginationDirection === PaginationDirection.Next) {
      constraints.push(limit(count));
    } else {
      constraints.push(limitToLast(count));
    }

    if (sortOptions !== null) {
      constraints.push(orderBy(sortOptions.field, sortOptions.direction));
    } else if (searchText !== null) {
      constraints.push(
        orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_DIRECTION),
        where(SEARCH_FIELD, '>=', searchText),
        where(SEARCH_FIELD, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
      );
    } else {
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
