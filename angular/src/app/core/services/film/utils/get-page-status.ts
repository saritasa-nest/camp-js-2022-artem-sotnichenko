import { PaginationDirection, QueryCursorId } from './types';

interface GetPageStatusOptions {

  /** Films array length. */
  filmsLength: number;

  /** Pagination direction. */
  paginationDirection: PaginationDirection;

  /** Films count per page. */
  filmsPerPage: number;

  /** Cursor for fetching bakwards. */
  backwardQueryCursorId: QueryCursorId;

  /** Cursor for fetching forward. */
  forwardQueryCursorId: QueryCursorId;
}

interface PageStatus {

  /** Whether it is first page. */
  isFirstPage: boolean;

  /** Whether it is last page. */
  isLastPage: boolean;
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
