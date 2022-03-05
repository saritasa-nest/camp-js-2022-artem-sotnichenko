import { Film } from 'src/app/core/models/film';

import { FilmCursor, PaginationDirection, QueryCursorId } from './types';

interface CursorsIds {

  /** Backward film cursor id. */
  backward: QueryCursorId | null;

  /** Forward film cursor id. */
  forward: QueryCursorId | null;
}

/**
 * Get cursors ids.
 * @param expectedCount Expected count of films.
 * @param films Films array.
 * @param cursor Current film cursor.
 */
export function getCursorsIds(expectedCount: number, films: readonly Film[], cursor: FilmCursor): CursorsIds {
  const { paginationDirection } = cursor;

  if (films.length === 0) {
    return {
      backward: null,
      forward: null,
    };
  }

  let forwardQueryCursorId: QueryCursorId | null = null;
  let backwardQueryCursorId: QueryCursorId | null = null;

  if (paginationDirection === PaginationDirection.Next) {
    if (films.length - 1 < expectedCount) {
      forwardQueryCursorId = null;
    } else {
      forwardQueryCursorId = films[films.length - 1].id;
    }
    backwardQueryCursorId = films[0].id;
  } else if (films.length - 1 < expectedCount) {
    forwardQueryCursorId = null;
    backwardQueryCursorId = null;
  } else {
    backwardQueryCursorId = films[0].id;
    forwardQueryCursorId = films[films.length - 1].id;
  }

  return {
    backward: backwardQueryCursorId,
    forward: forwardQueryCursorId,
  };
}
