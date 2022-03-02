import { PaginationDirection, QueryCursorId } from './types';

interface GetPageStatusOptions {

  /** Films array length. */
  readonly filmsLength: number;

  /** Pagination direction. */
  readonly paginationDirection: PaginationDirection;

  /** Films count per page. */
  readonly filmsPerPage: number;

  /** Cursor for fetching bakwards. */
  readonly backwardQueryCursorId: QueryCursorId;

  /** Cursor for fetching forward. */
  readonly forwardQueryCursorId: QueryCursorId;
}

interface PageStatus {

  /** Whether it is first page. */
  readonly isFirstPage: boolean;

  /** Whether it is last page. */
  readonly isLastPage: boolean;
}

/**
 * Get page statuses, whether they are last or/and first page.
 * @param options Options.
 * @returns
 */
export function getPageStatus(options: GetPageStatusOptions): PageStatus {
  if (options.filmsLength === 0) {
    return {
      isFirstPage: true,
      isLastPage: true,
    };
  }

  let isFirstPage = false;
  let isLastPage = false;

  if (options.paginationDirection === PaginationDirection.Next) {
    if (options.filmsLength < options.filmsPerPage + 1) {
      isLastPage = true;
    }
    if (options.backwardQueryCursorId === null && options.forwardQueryCursorId === null) {
      isFirstPage = true;
    }
  } else {
    if (options.filmsLength < options.filmsPerPage + 1) {
      isFirstPage = true;
    }
    if (options.forwardQueryCursorId === null && options.backwardQueryCursorId === null) {
      isLastPage = true;
    }
  }

  return { isFirstPage, isLastPage };
}
