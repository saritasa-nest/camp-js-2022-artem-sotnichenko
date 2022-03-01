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
 * @param opts Options.
 * @returns
 */
export function getPageStatus(opts: GetPageStatusOptions): PageStatus {
  if (opts.filmsLength === 0) {
    return {
      isFirstPage: true,
      isLastPage: true,
    };
  }

  let isFirstPage = false;
  let isLastPage = false;

  if (opts.paginationDirection === PaginationDirection.Next) {
    if (opts.filmsLength - 1 < opts.filmsPerPage) {
      isLastPage = true;
    }
    if (opts.backwardQueryCursorId === null && opts.forwardQueryCursorId === null) {
      isFirstPage = true;
    }
  } else {
    if (opts.filmsLength - 1 < opts.filmsPerPage) {
      isFirstPage = true;
    }
    if (opts.forwardQueryCursorId === null && opts.backwardQueryCursorId === null) {
      isLastPage = true;
    }
  }

  return { isFirstPage, isLastPage };
}
