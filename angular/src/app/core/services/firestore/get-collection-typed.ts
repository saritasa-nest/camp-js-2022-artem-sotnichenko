import { User } from 'firebase/auth';
import { collection, CollectionReference, DocumentData, Firestore } from 'firebase/firestore';

import { FilmDto } from '../mappers/dto/film.dto';

export type CollectionName = 'films' | 'characters' | 'planets';

/**
 *  Create collection with types.
 * @param db Firestore instance.
 * @param collectionName Collection name.
 */
export function getCollection<T = DocumentData>(db: Firestore, collectionName: CollectionName): CollectionReference<T> {
  return collection(db, collectionName) as CollectionReference<T>;
}
