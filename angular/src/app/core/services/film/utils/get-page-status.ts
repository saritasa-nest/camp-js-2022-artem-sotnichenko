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
    if (opts.backwardQueryCursorId === null) {
      isFirstPage = true;
    }
    if (opts.filmsLength - 1 < opts.filmsPerPage) {
      if (opts.backwardQueryCursorId !== null) {
        isFirstPage = false;
      }
      isLastPage = true;
    }
  } else {
    if (opts.forwardQueryCursorId === null) {
      isLastPage = true;
    }
    if (opts.filmsLength - 1 < opts.filmsPerPage) {
      if (opts.forwardQueryCursorId !== null) {
        isLastPage = false;
      }
      isFirstPage = true;
    }
  }

  return { isFirstPage, isLastPage };
}
