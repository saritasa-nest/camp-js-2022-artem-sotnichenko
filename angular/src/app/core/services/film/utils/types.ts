import { DocumentSnapshot } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';

/** Sort direction. */
export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

/** Sort field. */
export enum SortField {
  Title = 'fields.title',
  Producers = 'fields.producer',
  Director = 'fields.director',
  ReleaseDate = 'fields.release_date',
}

/** Film id or null. */
export type QueryCursorId = string | null;

/** Query cursor used for pagination. */
export type QueryCursor<T = DocumentData> = DocumentSnapshot<T> | '';

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

/** Fetch options. */
export interface FetchOptions extends FilterOptions {

  /** Pagination direction. */
  readonly paginationDirection: PaginationDirection;
}

/** Filter options. */
export interface FilterOptions {

  /** Search text. */
  readonly searchText: string | null;

  /** Sort options. */
  readonly sortOptions: SortOptions | null;
}
