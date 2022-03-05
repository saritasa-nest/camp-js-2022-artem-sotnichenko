import { Injectable } from '@angular/core';
import {
  combineLatest,
  map,
  Observable,
  switchMap,
} from 'rxjs';

import { Film } from '../../models/film';
import { FirestoreService } from '../firestore/firestore.service';
import { FilmDto } from '../mappers/dto/film.dto';
import { FilmMapper } from '../mappers/film.mapper';

import { getCursorsIds } from './utils/get-cursors-ids';

import { getQueryConstraint, GetQueryConstraintOptions } from './utils/get-query-constraint';
import { FilmCursor, PaginationDirection, SortOptions } from './utils/types';

interface GetFilmsReturn {

  /** Films array. */
  films: readonly Film[];

  /** Film cursors. */
  cursors: {

    /** Backward film cursor. */
    backward: FilmCursor | null;

    /** Forward film cursor. */
    forward: FilmCursor | null;
  };
}

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

const INITIAL_FILTER_OPTIONS = {
  searchText: null,
  sortOptions: null,
};

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
      queryCursorId: null,
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
  public getFilms(count: number, cursor: FilmCursor): Observable<GetFilmsReturn> {
    const {
      queryCursorId,
      paginationDirection,
      searchText,
      sortOptions,
    } = cursor;

    const filmsPage$ = this.firestoreService.getQueryCursorById(
      'films',
      queryCursorId,
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

    const cursors$ = filmsPage$
      .pipe(
        map(films => {
          const cursorIds = getCursorsIds({ expectedCount: count, films, paginationDirection });
          return {
            forward: paginationDirection === PaginationDirection.Prev && queryCursorId === null ? null : {
              ...cursor,
              paginationDirection: PaginationDirection.Next,
              queryCursorId: cursorIds.forward,
            },
            backward: paginationDirection === PaginationDirection.Next && queryCursorId === null ? null : {
              ...cursor,
              paginationDirection: PaginationDirection.Prev,
              queryCursorId: cursorIds.backward,
            },
          };
        }),
      );

    return combineLatest([filmsPage$, cursors$]).pipe(
      map(([films, cursors]) => ({ films, cursors })),
    );
  }

  private fetchFilms(options: GetQueryConstraintOptions): Observable<readonly FilmDto[]> {
    return this.firestoreService.fetchMany<FilmDto>(
      'films',
      getQueryConstraint({
        count: options.count,
        queryCursor: options.queryCursor,
        paginationDirection: options.paginationDirection,
        searchText: options.searchText,
        sortOptions: options.sortOptions,
      }),
    );
  }
}
