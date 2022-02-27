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
const SEARCH_FIELD = 'fields.title';
const FIREBASE_SEARCH_SYMBOL = '~';

interface GetQueryConstraintOptions {

  /** Items count per page. */
  count: number;

  /** Query cursor for paginating. */
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
  if (paginationDirection === PaginationDirection.Next) {
    if (sortOptions !== null) {
      if (queryCursor === '') {
        return [
          limit(count),
          orderBy(sortOptions.field, sortOptions.order),
        ];
      }
      return [
        limit(count),
        orderBy(sortOptions.field, sortOptions.order),
        startAt(queryCursor),
      ];
    }
    if (searchText !== null) {
      if (queryCursor === '') {
        return [
          limit(count),
          orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER),
          where(SEARCH_FIELD, '>=', searchText),
          where(SEARCH_FIELD, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
        ];
      }
      return [
        limit(count),
        orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER),
        startAt(queryCursor),
        where(SEARCH_FIELD, '>=', searchText),
        where(SEARCH_FIELD, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
      ];
    }
    if (queryCursor === '') {
      return [
        limit(count),
        orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER),
      ];
    }
    return [
      limit(count),
      orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER),
      startAt(queryCursor),
    ];

  }
  if (sortOptions !== null) {
    if (queryCursor === '') {
      return [
        limitToLast(count),
        orderBy(sortOptions.field, sortOptions.order),
      ];
    }
    return [
      limitToLast(count),
      orderBy(sortOptions.field, sortOptions.order),
      endAt(queryCursor),
    ];
  }
  if (searchText !== null) {
    if (queryCursor === '') {
      return [
        limitToLast(count),
        orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER),
        where(SEARCH_FIELD, '>=', searchText),
        where(SEARCH_FIELD, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
      ];
    }
    return [
      limitToLast(count),
      orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER),
      endAt(queryCursor),
      where(SEARCH_FIELD, '>=', searchText),
      where(SEARCH_FIELD, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
    ];
  }
  if (queryCursor === '') {
    return [
      limitToLast(count),
      orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER),
    ];
  }
  return [
    limitToLast(count),
    orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER),
    endAt(queryCursor),
  ];
}
