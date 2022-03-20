import {
  limit, orderBy, QueryConstraint, startAfter, where,
} from 'firebase/firestore';
import { Film } from 'src/models/film';
import { FilmDocument } from '../dtos/film.dto';
import { FilmMapper } from '../mappers/film.mapper';
import { FirestoreService } from './firestore.service';

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

export const TO_READABLE_SORT_FIELD_MAP: Readonly<Record<SortField, string>> = {
  [SortField.Title]: 'Title',
  [SortField.Producers]: 'Producers',
  [SortField.Director]: 'Director',
  [SortField.ReleaseDate]: 'Release date',
};

export const TO_READABLE_SORT_DIRECTION_MAP: Readonly<Record<SortDirection, string>> = {
  [SortDirection.Ascending]: 'Ascending',
  [SortDirection.Descending]: 'Descending',
};

const DEFAULT_SORT_FIELD = SortField.Title;
const DEFAULT_SORT_DIRECTION = SortDirection.Ascending;
const DEFAULT_SEARCH_FIELD = SortField.Title;
const FIREBASE_SEARCH_SYMBOL = '~';

/**
 * Get query constraint, for use in firestore query.
 * @param options Options.
 */
async function getQueryConstraints({
  count,
  fetchAfter,
  filter,
}: FilmService.FetchFilmsOptions): Promise<readonly QueryConstraint[]> {
  const constraints: QueryConstraint[] = [];

  constraints.push(limit(count));

  if (filter != null) {
    if ('searchText' in filter) {
      constraints.push(
        where(DEFAULT_SEARCH_FIELD, '>=', filter.searchText),
        where(DEFAULT_SEARCH_FIELD, '<=', `${filter.searchText}${FIREBASE_SEARCH_SYMBOL}`),
      );
    } else {
      constraints.push(orderBy(filter.sortField, filter.sortDirection));
    }
  } else {
    constraints.push(orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_DIRECTION));
  }

  if (fetchAfter != null) {
    const cursor = await FirestoreService.fetchSnapshot('films', fetchAfter);
    constraints.push(startAfter(cursor));
  }

  return constraints;
}

export namespace FilmService {
  /** Search filter. */
  export interface FilterSearch {
    /** Search text. */
    searchText: string;
  }

  /** Sort filter. */
  export interface FilterSort {
    /** Sort field. */
    sortField: SortField;

    /** Sort direction. */
    sortDirection: SortDirection;
  }

  /** Filter. Search and sort are exclusive only one can be applied. */
  export type Filter = FilterSearch | FilterSort;

  /** Options of `fetchFilms`. */
  export interface FetchFilmsOptions {
    /** Count of film. */
    count: number;

    /** Fetch after entity id. */
    fetchAfter?: string;

    /** Filter. Search and sort are exclusive only one can be applied. */
    filter?: Filter;
  }

  /**
   * Fetch films.
   * @param options Options.
   */
  export async function fetchFilms(options?: FetchFilmsOptions): Promise<Film[]> {
    const constraints = options ? await getQueryConstraints(options) : [];
    const filmDtos = await FirestoreService.fetchMany<FilmDocument>('films', constraints);
    return filmDtos.map(FilmMapper.fromDto);
  }
}
