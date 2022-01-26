import {
  doc,
  endBefore,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';

import { createCollection } from '../utils';

import { FilmDto, FilmDocument } from './types';

interface FetchFilmsOptions {

  /** Field name for order. */
  orderBy: string;
}

/** FetchFilmsAfterId options. */
export interface FetchFilmsAfterIdOptions extends FetchFilmsOptions {

  /** Number of films to fetch. */
  limit: number;

  /** Id of film to fetch after. */
  startAfter?: string;
}

/**
 * Fetch film dtos after film by id.
 * @param options Options.
 */
export async function fetchFilmsAfterId(options: FetchFilmsAfterIdOptions): Promise<FilmDto[]> {
  const prevDoc = options.startAfter ? await getDoc(doc(createCollection<FilmDocument>('films'), options.startAfter)) : '';

  const q = query(
    createCollection<FilmDocument>('films'),
    orderBy(options.orderBy),
    limit(options.limit),
    startAfter(prevDoc),
  );

  const querySnapshot = await getDocs<FilmDocument>(q);
  return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
}

/** FetchFilmsBeforeId options. */
export interface FetchFilmsBeforeIdOptions extends FetchFilmsOptions {

  /** Number of films to fetch. */
  limit: number;

  /** Id of film to fetch before. */
  endBefore?: string;
}

/**
 * Fetch film dtos before film by id.
 * @param options Options.
 */
export async function fetchFilmsBeforeId(options: FetchFilmsBeforeIdOptions): Promise<FilmDto[]> {
  const prevDoc = options.endBefore ? await getDoc(doc(createCollection<FilmDocument>('films'), options.endBefore)) : '';

  const q = query(
    createCollection<FilmDocument>('films'),
    orderBy(options.orderBy),
    limitToLast(options.limit),
    endBefore(prevDoc),
  );

  const querySnapshot = await getDocs<FilmDocument>(q);
  return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
}
