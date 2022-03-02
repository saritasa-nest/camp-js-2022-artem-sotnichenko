import { collection, CollectionReference, DocumentData, Firestore } from 'firebase/firestore';

export type CollectionName = 'films' | 'characters' | 'planets';

/**
 * Create typed collection.
 * @param db Firestore instance.
 * @param collectionName Collection name.
 */
export function getCollection<T = DocumentData>(db: Firestore, collectionName: CollectionName): CollectionReference<T> {
  return collection(db, collectionName) as CollectionReference<T>;
}
