import {
  doc,
  DocumentSnapshot,
  endBefore,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';

import { createCollection } from '../../firebase/utils';

import { FilmDto, FilmDocument, SortField, SortType } from './types';

/** Fetches first document.
 *
 * Different queries need different cursor to work. For example ascending order require empty string,
 * but descending order require document (for the first fetch).
 * @param filmId Film id, undefined to fetch from beginning.
 * @param isDescending Order of fetch.
 */
async function fetchFirstFilm(filmId: string | null, isDescending: boolean): Promise<DocumentSnapshot<FilmDocument> | FilmDto | ''> {
  if (filmId === null) {
    if (isDescending) {
      const q = query(createCollection<FilmDocument>('films'), limit(1));
      const querySnapshot = await getDocs<FilmDocument>(q);
      return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id }))[0];
    }
    return '';
  }
  return getDoc(doc(createCollection<FilmDocument>('films'), filmId));
}

export const sortFields = {
  title: SortField.Title,
  producer: SortField.Producer,
  director: SortField.Director,
  releaseDate: SortField.ReleaseDate,
} as const;

export const sortTypes = {
  ascending: SortType.Ascending,
  descending: SortType.Descending,
} as const;

interface FetchFilmsOptions {

  /** Field name for order. */
  readonly orderBy: SortField;

  /** Number of films to fetch. */
  readonly limit: number;

  /** Number of films to fetch. */
  readonly isDescending: boolean;
}

/** FetchFilmsAfterId options. */
export interface FetchFilmsAfterIdOptions extends FetchFilmsOptions {

  /** Id of film to fetch after. */
  readonly startAfter: string | null;
}

/**
 * Fetch film dtos after film by id.
 * @param options Options.
 */
export async function fetchFilmsAfterId(options: FetchFilmsAfterIdOptions): Promise<FilmDto[]> {
  const cursorDoc = await fetchFirstFilm(options.startAfter, options.isDescending);

  const q = query(
    createCollection<FilmDocument>('films'),
    orderBy(
      options.orderBy,
      options.isDescending ? sortTypes.descending : sortTypes.ascending,
    ),
    limit(options.limit),
    startAfter(cursorDoc),
  );

  const querySnapshot = await getDocs<FilmDocument>(q);
  const films = querySnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
  return films;
}

/** FetchFilmsBeforeId options. */
export interface FetchFilmsBeforeIdOptions extends FetchFilmsOptions {

  /** Id of film to fetch before. */
  readonly endBefore: string | null;
}

/**
 * Fetch film dtos before film by id.
 * @param options Options.
 */
export async function fetchFilmsBeforeId(options: FetchFilmsBeforeIdOptions): Promise<FilmDto[]> {
  const cursorDoc = await fetchFirstFilm(options.endBefore, options.isDescending);

  const q = query(
    createCollection<FilmDocument>('films'),
    orderBy(
      options.orderBy,
      options.isDescending ? sortTypes.descending : sortTypes.ascending,
    ),
    limitToLast(options.limit),
    endBefore(cursorDoc),
  );

  const querySnapshot = await getDocs<FilmDocument>(q);
  return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
}
