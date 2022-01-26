import { getDocs } from 'firebase/firestore';

import { createCollection } from '../utils';

import { FilmDto, FilmDocument } from './types';

/** Fetch all films. */
export async function fetchFilms(): Promise<FilmDto[]> {
  const querySnapshot = await getDocs<FilmDocument>(createCollection<FilmDocument>('films'));

  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}
