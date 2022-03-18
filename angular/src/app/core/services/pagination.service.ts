import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Film } from '../models/film';

import { FilmsService } from './films/films.service';
import { EntityId, FilmCursor, PagesStatus, PaginationDirection } from './film/utils/types';

/**
 * Pagination service.
 */
@Injectable({
  providedIn: 'root',
})
export class PaginationService {

  public constructor(
    private readonly filmsService: FilmsService,
  ) { }

  /**
   * Get count to fetch.
   * Encapsulate logic of pagination, so other methods can calculate wheter there next pages or not by fetching on more item.
   * @param count Expected count of films on the page.
   */
  private getPaginationCount(count: number): number {
    return count + 1;
  }

  /**
   * Films array without slicing, needed to get cursors and update pages statuses.
   * @param count Expected count of films.
   * @param cursor Current film cursor.
   */
  public getFilms(count: number, cursor: FilmCursor): Observable<Film[]> {
    const paginationCount = this.getPaginationCount(count);
    return this.filmsService.getFilms(paginationCount, cursor).pipe(
      map(films => this.getFilmsPage(paginationCount, films, cursor)),
    );
  }

  /**
   * Get films page from films array.
   * Can be less than `films` because of pagination logic.
   * @param expectedCount Expected count of films.
   * @param films Films array.
   * @param cursor Current film cursor.
   */
  public getFilmsPage(expectedCount: number, films: readonly Film[], cursor: FilmCursor): Film[] {
    const { paginationDirection } = cursor;
    const paginationCount = this.getPaginationCount(expectedCount);

    // Means it is last page.
    if (films.length < paginationCount) {
      return [...films];
    }

    // Otherwise slicing element depending on direction.
    if (paginationDirection === PaginationDirection.Next) {
      return films.slice(0, -1);
    }
    return films.slice(1);
  }

  /**
   * Get pages status.
   * @param expectedCount Expected count of films.
   * @param films Films array.
   * @param cursor Current film cursor.
   */
  public getPagesStatus(
    expectedCount: number,
    films: readonly Film[],
    cursor: FilmCursor,
  ): PagesStatus {
    const {
      entityId,
      paginationDirection,
    } = cursor;

    let isFirst = entityId === null;
    let isLast = false;

    if (films.length < expectedCount) {
      if (paginationDirection === PaginationDirection.Next) {
        isLast = true;
      } else {
        isFirst = true;
      }
    }

    return { isFirst, isLast };
  }

  /**
   * Get cursors to fetch other pages.
   * @param expectedCount Expected films count.
   * @param films Films array.
   * @param currentCursor Current film cursor.
   */
  public getCursors(
    expectedCount: number,
    films: readonly Film[],
    currentCursor: FilmCursor,
  ): {
    readonly backward: FilmCursor | null;
    readonly forward: FilmCursor | null;
  } {
    const {
      entityId,
      paginationDirection,
    } = currentCursor;
    const paginationCount = this.getPaginationCount(expectedCount);
    const entityIds = this.getEntitiesIds(paginationCount, films, paginationDirection);

    return {
      forward: paginationDirection === PaginationDirection.Prev && entityId === null ? null : {
        ...currentCursor,
        paginationDirection: PaginationDirection.Next,
        entityId: entityIds.forward,
      },
      backward: paginationDirection === PaginationDirection.Next && entityId === null ? null : {
        ...currentCursor,
        paginationDirection: PaginationDirection.Prev,
        entityId: entityIds.backward,
      },
    };
  }

  /**
   * Get entities ids.
   * @param expectedCount Expected count of films.
   * @param films Films array.
   * @param paginationDirection Pagination direction.
   */
  private getEntitiesIds(
    expectedCount: number,
    films: readonly Film[],
    paginationDirection: PaginationDirection,
  ): {
    readonly backward: EntityId;
    readonly forward: EntityId;
  } {
    if (films.length === 0) {
      return {
        backward: null,
        forward: null,
      };
    }

    let forwardEntityId: EntityId = null;
    let backwardEntityId: EntityId = null;

    if (paginationDirection === PaginationDirection.Next) {
      if (films.length === expectedCount) {
        forwardEntityId = films[films.length - 1].id;
      }
      backwardEntityId = films[0].id;
    } else if (films.length === expectedCount) {
      backwardEntityId = films[0].id;
      forwardEntityId = films[films.length - 1].id;
    }

    return {
      backward: backwardEntityId,
      forward: forwardEntityId,
    };
  }
}
