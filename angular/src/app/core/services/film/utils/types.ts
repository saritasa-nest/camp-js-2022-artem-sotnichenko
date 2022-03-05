import { DocumentSnapshot } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';

import { SortDirection, SortField } from '../../firestore/utils/types';

/** Pages status. */
export interface PagesStatus {

  /** Wheter it is first page. */
  readonly isFirst: boolean;

  /** Wheter it is last page. */
  readonly isLast: boolean;
}

/** Film id or null. */
export type EntityId = string | null;

/** Query cursor used for pagination. */
export type QueryCursor<T = DocumentData> = DocumentSnapshot<T> | null;

/** Sort options. */
export interface SortOptions {

  /** Field to sort by. */
  readonly field: SortField;

  /** Sort direction. */
  readonly direction: SortDirection;
}

/** Direction of pagination. */
export enum PaginationDirection {
  Next = 'next',
  Prev = 'prev',
}

/** Filter options. */
export interface FilterOptions {

  /** Search text. */
  readonly searchText: string | null;

  /** Sort options. */
  readonly sortOptions: SortOptions | null;
}

/** Film cursor to fetch films. */
export interface FilmCursor extends FilterOptions {

  /** Query cursor id for fetching. */
  readonly entityId: EntityId;

  /** Pagination direction. */
  readonly paginationDirection: PaginationDirection;
}
