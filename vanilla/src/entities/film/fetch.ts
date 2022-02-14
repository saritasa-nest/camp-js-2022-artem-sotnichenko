import {
  deleteDoc,
  doc,
  DocumentSnapshot,
  endBefore,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  QueryConstraint,
  where,
} from 'firebase/firestore';

import { getCollection, mapDocumentToDto } from '../../firebase/utils';

import { FilmDto, FilmDocument, SortField, SortType } from './types';

/**
 * Create Film from DTO.
 * @param filmDto Film DTO.
 * @returns Id of created film.
 */
export async function createFilm(filmDto: FilmDto): Promise<string> {
  const emptyDoc = doc(getCollection<FilmDocument>('films'));
  await setDoc(emptyDoc, filmDto);
  return emptyDoc.id;
}

/**
 * Update Film from DTO.
 * @param id Film id.
 * @param filmDto Film DTO.
 */
export async function updateFilm(id: string, filmDto: FilmDto): Promise<void> {
  const filmDoc = doc(getCollection<FilmDocument>('films'), id);
  await updateDoc(filmDoc, filmDto);
}

/**
 * Fetch film by id.
 * @param id Film id.
 */
export async function fetchFilmById(id: string): Promise<FilmDto> {
  const filmDoc = await getDoc(doc(getCollection<FilmDocument>('films'), id));
  return mapDocumentToDto(filmDoc);
}

/**
 * Fetches first document.
 *
 * Different queries need different cursor to work. For example ascending order require empty string,
 * but descending order require document (for the first fetch).
 * @param filmId Film id, undefined to fetch from beginning.
 * @param isDescending Order of fetch.
 * @param searchFieldQueryConstraint Constraints for search field.
 */
async function fetchFirstFilmCursor(filmId: string | null, isDescending: boolean,
  searchFieldQueryConstraint: QueryConstraint[]): Promise<DocumentSnapshot<FilmDocument> | FilmDto | ''> {
  if (filmId === null) {
    if (isDescending) {

      const documentQuery = query(getCollection<FilmDocument>('films'), ...searchFieldQueryConstraint, limit(1));

      const querySnapshot = await getDocs<FilmDocument>(documentQuery);
      return querySnapshot.docs.map(mapDocumentToDto)[0];
    }
    return '';
  }
  return getDoc(doc(getCollection<FilmDocument>('films'), filmId));
}

interface FetchFilmsOptions {

  /** Field name for order. */
  readonly orderBy: SortField;

  /** Number of films to fetch. */
  readonly limit: number;

  /** Number of films to fetch. */
  readonly isDescending: boolean;
}

/** Options for function "fetchFilmsAfterId". */
export interface FetchFilmsAfterIdOptions extends FetchFilmsOptions {

  /** Id of film to fetch after. */
  readonly startAfter: string | null;

  /** Substring to find in string. */
  readonly substringSearch: string;
}

/**
 * Fetch film dtos after film by id.
 * @param options Options.
 */
export async function fetchFilmsAfterId(options: FetchFilmsAfterIdOptions): Promise<FilmDto[]> {
  // Query constraint to use it to get cursor goc and films.
  const { searchFieldQueryConstraint, orderByConstraint } = getConstraint(options);

  const cursorDoc = await fetchFirstFilmCursor(options.startAfter, options.isDescending, searchFieldQueryConstraint);
  const filmQuery = query(

    getCollection<FilmDocument>('films'),
    ...searchFieldQueryConstraint,
    ...orderByConstraint,

    limit(options.limit),
    startAfter(cursorDoc),
  );

  const querySnapshot = await getDocs<FilmDocument>(filmQuery);
  return querySnapshot.docs.map(mapDocumentToDto);
}

/** Options for function "fetchFilmsBeforeId". */
export interface FetchFilmsBeforeIdOptions extends FetchFilmsOptions {

  /** Id of film to fetch before. */
  readonly endBefore: string | null;

  /** Substring to find in string. */
  readonly substringSearch: string;
}

/**
 * Fetch film dtos before film by id.
 * @param options Options.
 */
export async function fetchFilmsBeforeId(options: FetchFilmsBeforeIdOptions): Promise<FilmDto[]> {
  // Query constraint to use it to get cursor goc and films.
  const { searchFieldQueryConstraint, orderByConstraint } = getConstraint(options);
  const cursorDoc = await fetchFirstFilmCursor(options.endBefore, options.isDescending, searchFieldQueryConstraint);
  const filmQuery = query(

    getCollection<FilmDocument>('films'),
    ...searchFieldQueryConstraint,
    ...orderByConstraint,

    limitToLast(options.limit),
    endBefore(cursorDoc),
  );

  const querySnapshot = await getDocs<FilmDocument>(filmQuery);
  return querySnapshot.docs.map(mapDocumentToDto);
}

interface QueryConstraints {

  /** Id of film to fetch before. */
  readonly searchFieldQueryConstraint: QueryConstraint[];

  /** Substring to find in string. */
  readonly orderByConstraint: QueryConstraint[];
}

/**
 * Return fields to make query.
 * @param options Options.
 */
function getConstraint(options: FetchFilmsBeforeIdOptions | FetchFilmsAfterIdOptions): QueryConstraints {
  const fieldsTitle = 'fields.title';
  const uniCode = '\uf8ff';

  let searchFieldQueryConstraint: QueryConstraint[];
  let orderByConstraint: QueryConstraint[];
  if (options.substringSearch.length === 0) {
    searchFieldQueryConstraint = [];
    orderByConstraint = [
      orderBy(
        options.orderBy,
        options.isDescending ? SortType.Descending : SortType.Ascending,
      ),
    ];
  } else {
    searchFieldQueryConstraint = [
      where(fieldsTitle, '>=', options.substringSearch),
      where(fieldsTitle, '<=', `${options.substringSearch}${uniCode}`),
    ];
    orderByConstraint = [
      orderBy(
        fieldsTitle,
        options.isDescending ? SortType.Descending : SortType.Ascending,
      ),
    ];
  }
  return {
    searchFieldQueryConstraint,
    orderByConstraint,
  };
}

/**
 * Delete film by id.
 * @param id Film id.
 */
export function deleteFilm(id: string): Promise<void> {
  return deleteDoc(doc(getCollection<FilmDocument>('films'), id));
}
