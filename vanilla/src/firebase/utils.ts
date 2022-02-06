import { CollectionReference, collection, DocumentData, DocumentSnapshot } from 'firebase/firestore';

import { ERROR_DOCUMENT_NOT_EXISTS } from '../utils/constants';

import { FirebaseWrapper } from './types';

import { db } from './init';

/**
 *  Create collection with types.
 * @param collectionName Collection name.
 */
export function createCollection<T = DocumentData>(collectionName: string): CollectionReference<T> {
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
