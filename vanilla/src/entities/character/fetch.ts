import { doc, DocumentSnapshot, getDoc, getDocs, query, where } from 'firebase/firestore';

import { createCollection } from '../../firebase/utils';
import { ERROR_DOCUMENT_NOT_EXISTS } from '../../utils/constants';

import { Character, CharacterDocument, CharacterDto } from './types';

/**
 * Map character document to character dto.
 * @param characterDoc Character document.
 */
export function mapDocumentToDto(characterDoc: DocumentSnapshot<CharacterDocument>): CharacterDto {
  const characterData = characterDoc.data();
  if (!characterData) {
    throw new Error(ERROR_DOCUMENT_NOT_EXISTS);
  }

  return {
    ...characterData,
    id: characterDoc.id,
  };
}

/**
 * Fetch characters by id.
 * @param ids Character ids.
 */
export async function fetchCharactersByIds(ids: readonly string[]): Promise<CharacterDto[]> {
  const querySnapshotsPromises = [];
  for (let i = 0; i < ids.length; i += 10) {
    const documentQuery = query(createCollection<CharacterDocument>('characters'), where('__name__', 'in', ids.slice(i, i + 10)));
    const querySnapshot = getDocs<CharacterDocument>(documentQuery);
    querySnapshotsPromises.push(querySnapshot);
  }
  const querySnapshots = await Promise.all(querySnapshotsPromises);
  return querySnapshots.flatMap(querySnapshot => querySnapshot.docs.map(mapDocumentToDto));
}
