import { CollectionReference, collection, DocumentData, DocumentSnapshot } from 'firebase/firestore';

import { ERROR_DOCUMENT_NOT_EXISTS } from '../utils/constants';

import { FirebaseWrapper } from './types';

import { db } from './init';

export type CollectionName = 'films' | 'characters' | 'planets' | 'species' | 'starships' | 'vehicles';

/**
 *  Create collection with types.
 * @param collectionName Collection name.
 */
export function getCollection<T = DocumentData>(collectionName: CollectionName): CollectionReference<T> {
  return collection(db, collectionName) as CollectionReference<T>;
}

/**
 * Map character document to character dto.
 * @param characterDoc Character document.
 */
export function mapDocumentToDto<Doc>(characterDoc: DocumentSnapshot<Doc>): Doc & FirebaseWrapper {
  const characterData = characterDoc.data();
  if (!characterData) {
    throw new Error(ERROR_DOCUMENT_NOT_EXISTS);
  }

  return {
    ...characterData,
    id: characterDoc.id,
  };
}
