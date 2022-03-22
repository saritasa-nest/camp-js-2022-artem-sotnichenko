import {
  limit, orderBy, QueryConstraint, startAfter, where,
} from 'firebase/firestore';
import { Film } from 'src/models/film';
import { FilmDocument } from '../dtos/film.dto';
import { FilmMapper } from '../mappers/film.mapper';
import { FirestoreService } from './firestore.service';

/** Sort field. */
export enum FilmSortField {
  Title = 'fields.title',
  Producers = 'fields.producer',
  Director = 'fields.director',
  ReleaseDate = 'fields.release_date',
}

/** Sort direction. */
export enum FilmSortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

/** Search filter. */
export interface FilmFetchFilterSearch {
  /** Search text. */
  readonly searchText: string;
}

/** Sort filter. */
export interface FilmFetchFilterSort {
  /** Sort field. */
  readonly sortField: FilmSortField;

  /** Sort direction. */
  readonly sortDirection: FilmSortDirection;
}

/** Filter. Search and sort are exclusive only one can be applied. */
export type FilmFetchFilter = FilmFetchFilterSearch | FilmFetchFilterSort;

/** Fetch many films options. */
export interface FilmFetchManyOptions {
  /** Count of film. */
  readonly count?: number;

  /** Fetch after entity id. */
  readonly afterId?: string;

  /** Filter. Search and sort are exclusive only one can be applied. */
  readonly filter?: FilmFetchFilter;
}

const FILMS_PER_PAGE = 5;
const FIREBASE_SEARCH_SYMBOL = '~';

const DEFAULT_SORT_FIELD = FilmSortField.Title;
const DEFAULT_SORT_DIRECTION = FilmSortDirection.Ascending;
const DEFAULT_SEARCH_SORT_FIELD = FilmSortField.Title;

/**
 * Get query constraint, for use in firestore query.
 * @param options Options.
 */
async function getQueryConstraints({
  count = FILMS_PER_PAGE,
  afterId,
  filter,
}: FilmFetchManyOptions): Promise<readonly QueryConstraint[]> {
  const constraints: QueryConstraint[] = [];

  constraints.push(limit(count));

  if (filter != null) {
    if ('searchText' in filter) {
      constraints.push(
        where(DEFAULT_SEARCH_SORT_FIELD, '>=', filter.searchText),
        where(DEFAULT_SEARCH_SORT_FIELD, '<=', `${filter.searchText}${FIREBASE_SEARCH_SYMBOL}`),
      );
    } else {
      constraints.push(orderBy(filter.sortField, filter.sortDirection));
    }
  } else {
    constraints.push(orderBy(DEFAULT_SORT_FIELD, DEFAULT_SORT_DIRECTION));
  }

  if (afterId != null) {
    const cursor = await FirestoreService.fetchSnapshot('films', afterId);
    constraints.push(startAfter(cursor));
  }

  return constraints;
}

export namespace FilmService {
  /**
   * Fetch films.
   * @param options Options.
   */
  export async function fetchMany(options?: FilmFetchManyOptions): Promise<Film[]> {
    const constraints = options ? await getQueryConstraints(options) : [];
    const filmDtos = await FirestoreService.fetchMany<FilmDocument>('films', constraints);
    return filmDtos.map(FilmMapper.fromDto);
  }

  export const sortFieldMap: Readonly<Record<FilmSortField, string>> = {
    [FilmSortField.Title]: 'Title',
    [FilmSortField.Producers]: 'Producers',
    [FilmSortField.Director]: 'Director',
    [FilmSortField.ReleaseDate]: 'Release date',
  };

  export const sortDirectionMap: Readonly<Record<FilmSortDirection, string>> = {
    [FilmSortDirection.Ascending]: 'Ascending',
    [FilmSortDirection.Descending]: 'Descending',
  };
}
