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
  readonly queryCursorId: QueryCursorId;

  /** Pagination direction. */
  readonly paginationDirection: PaginationDirection;
}
