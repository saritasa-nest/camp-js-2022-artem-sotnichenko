import { DocumentSnapshot } from 'firebase/firestore';

import { FilmDocument } from '../../mappers/dto/film.dto';

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
export type QueryCursor = DocumentSnapshot<FilmDocument> | '';

/** Sort options. */
export interface SortOptions {

  /** Field to sort by. */
  field: SortField;

  /** Sort direction. */
  direction: SortDirection;
}

/** Direction of pagination. */
export enum PaginationDirection {
  Next = 'next',
  Prev = 'prev',
}

/** Filter options. */
export interface FilterOptions {

  /** Search text. */
  searchText: string | null;

  /** Sort options. */
  sortOptions: SortOptions | null;

  /** Pagination direction. */
  paginationDirection: PaginationDirection | null;
}
