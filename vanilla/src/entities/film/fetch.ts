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
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore';

import { createCollection } from '../../firebase/utils';

import { FilmDto, FilmDocument, SortField, SortType } from './types';

/**
 * Map film document to film dto.
 * @param filmDoc Film document.
 * @returns
 */
function mapDocumentToDto(filmDoc: QueryDocumentSnapshot<FilmDocument>): FilmDto {
  return {
    ...filmDoc.data(),
    id: filmDoc.id,
  };
}

/** Fetches first document.
 *
 * Different queries need different cursor to work. For example ascending order require empty string,
 * but descending order require document (for the first fetch).
 * @param filmId Film id, undefined to fetch from beginning.
 * @param isDescending Order of fetch.
 */
async function fetchFirstFilmCursor(filmId: string | null, isDescending: boolean): Promise<DocumentSnapshot<FilmDocument> | FilmDto | ''> {
  if (filmId === null) {
    if (isDescending) {
      const documentQuery = query(createCollection<FilmDocument>('films'), limit(1));
      const querySnapshot = await getDocs<FilmDocument>(documentQuery);
      return querySnapshot.docs.map(mapDocumentToDto)[0];
    }
    return '';
  }
  return getDoc(doc(createCollection<FilmDocument>('films'), filmId));
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
}

/**
 * Fetch film dtos after film by id.
 * @param options Options.
 */
export async function fetchFilmsAfterId(options: FetchFilmsAfterIdOptions): Promise<FilmDto[]> {
  const cursorDoc = await fetchFirstFilmCursor(options.startAfter, options.isDescending);

  const filmQuery = query(
    createCollection<FilmDocument>('films'),
    orderBy(
      options.orderBy,
      options.isDescending ? SortType.Descending : SortType.Ascending,
    ),
    limit(options.limit),
    startAfter(cursorDoc),
  );

  const querySnapshot = await getDocs<FilmDocument>(filmQuery);
  const films = querySnapshot.docs.map(mapDocumentToDto);
  return films;
}

/** Options for function "fetchFilmsBeforeId". */
export interface FetchFilmsBeforeIdOptions extends FetchFilmsOptions {

  /** Id of film to fetch before. */
  readonly endBefore: string | null;
}

/**
 * Fetch film dtos before film by id.
 * @param options Options.
 */
export async function fetchFilmsBeforeId(options: FetchFilmsBeforeIdOptions): Promise<FilmDto[]> {
  const cursorDoc = await fetchFirstFilmCursor(options.endBefore, options.isDescending);

  const filmQuery = query(
    createCollection<FilmDocument>('films'),
    orderBy(
      options.orderBy,
      options.isDescending ? SortType.Descending : SortType.Ascending,
    ),
    limitToLast(options.limit),
    endBefore(cursorDoc),
  );

  const querySnapshot = await getDocs<FilmDocument>(filmQuery);
  return querySnapshot.docs.map(mapDocumentToDto);
}
