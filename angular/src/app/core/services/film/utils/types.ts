import { DocumentSnapshot } from 'firebase/firestore';

import { FilmDocument } from '../../mappers/dto/film.dto';

/** Sort order. */
export enum SortOrder {
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

/** Query cursor used for pagination. */
export type QueryCursor = DocumentSnapshot<FilmDocument> | '';

/** Sort options. */
export interface SortOptions {

  /** Field to sort by. */
  field: SortField;

  /** Sort ordering. */
  order: SortOrder;
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
