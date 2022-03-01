import {
  endAt,
  limit,
  limitToLast,
  orderBy,
  QueryConstraint,
  startAt,
  where,
} from 'firebase/firestore';

import { PaginationDirection, QueryCursor, SortField, SortOptions, SortOrder } from './types';

const DEFAULT_SORT_FIELD = SortField.Title;
const DEFAULT_SORT_ORDER = SortOrder.Ascending;
const SEARCH_SORT_FIELD = SortField.Title;
const FIREBASE_SEARCH_SYMBOL = '~';

interface GetQueryConstraintOptions {

  /** Items count per page. */
  count: number;

  /** Query cursor. */
  queryCursor: QueryCursor;

  /** Whether it fetch after or before query cursor. */
  paginationDirection: PaginationDirection;

  /** Search text. */
  searchText: string | null;

  /** Sort options. */
  sortOptions: SortOptions | null;
}

/**
 * Get query constraint, for use in firestore query.
 * @param options Options.
 */
export function getQueryConstraint({
  count,
  queryCursor,
  paginationDirection,
  searchText,
  sortOptions,
}: GetQueryConstraintOptions): QueryConstraint[] {
  const constraints: QueryConstraint[] = [];

  if (paginationDirection === PaginationDirection.Next) {
    constraints.push(limit(count));

    if (sortOptions !== null) {
      constraints.push(orderBy(sortOptions.field, sortOptions.order));
    } else if (searchText !== null) {
      constraints.push(
        orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER),
        where(SEARCH_SORT_FIELD, '>=', searchText),
        where(SEARCH_SORT_FIELD, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
      );
    } else {
      constraints.push(orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER));
    }

    if (queryCursor !== '') {
      constraints.push(startAt(queryCursor));
    }

    return constraints;
  }

  constraints.push(limitToLast(count));

  if (sortOptions !== null) {
    constraints.push(orderBy(sortOptions.field, sortOptions.order));
  } else if (searchText !== null) {
    constraints.push(
      orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER),
      where(SEARCH_SORT_FIELD, '>=', searchText),
      where(SEARCH_SORT_FIELD, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
    );
  } else {
    constraints.push(orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER));
  }

  if (queryCursor !== '') {
    constraints.push(endAt(queryCursor));
  }

  return constraints;
}
