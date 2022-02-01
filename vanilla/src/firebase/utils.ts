import { CollectionReference, collection, DocumentData } from 'firebase/firestore';

import { db } from './init';

/**
 *  Create collection with types.
 * @param collectionName Collection name.
 */
export function createCollection<T = DocumentData>(collectionName: string): CollectionReference<T> {
  return collection(db, collectionName) as CollectionReference<T>;
}
