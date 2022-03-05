import { Injectable } from '@angular/core';

import { Film } from '../models/film';

import { FilmCursor, PaginationDirection } from './film/utils/types';

interface PagesStatuses {

  /** Whether it is first page. */
  readonly isFirstPage: boolean;

  /** Whether it is last page. */
  readonly isLastPage: boolean;
}

/**
 * Pagination service.
 */
@Injectable({
  providedIn: 'root',
})
export class PaginationService {

  public constructor() { }

  /**
   * Get count to fetch.
   * Encapsulate logic of pagination, so it can calculate wheter there next pages or not.
   * @param expectedCount Expected count of films on the page.
   */
  public getFilmsCountPerPage(expectedCount: number): number {
    return expectedCount + 1;
  }

  /**
   * Get films page.
   * Can be less than `films` because of pagination logic.
   * @param expectedCount Expected count of films.
   * @param films Films array.
   * @param cursor Current film cursor.
   */
  public getFilmsPage(expectedCount: number, films: readonly Film[], cursor: FilmCursor): readonly Film[] {
    const { paginationDirection } = cursor;

    // Means it is last page.
    if (films.length < expectedCount) {
      return films;
    }

    // Otherwise slicing element depending on direction.
    if (paginationDirection === PaginationDirection.Next) {
      return films.slice(0, -1);
    }
    return films.slice(1);
  }

  /**
   * Get page buttons statuses.
   * @param expectedCount Expected count of films.
   * @param films Films array.
   * @param cursor Current film cursor.
   */
  public getPagesStatuses(expectedCount: number, films: readonly Film[], cursor: FilmCursor): PagesStatuses {
    const {
      paginationDirection,
      queryCursorId,
    } = cursor;

    const count = films.length;

    let isFirstPage = false;
    let isLastPage = false;

    if (queryCursorId === null) {
      isFirstPage = true;
    }

    if (count < expectedCount) {
      if (paginationDirection === PaginationDirection.Next) {
        isLastPage = true;
      } else {
        isFirstPage = true;
      }
    }

    return { isFirstPage, isLastPage };
  }
}
