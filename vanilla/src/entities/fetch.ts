import { getDocs, query } from 'firebase/firestore';

import { FirebaseWrapper } from '../firebase/types';
import { CollectionName, getCollection, mapDocumentToDto } from '../firebase/utils';

/**
 * Fetch all entity dtos from collection.
 * @param collectionName Collection name to fetch.
 */
export async function fetchAllFromCollection<Doc>(collectionName: CollectionName): Promise<(Doc & FirebaseWrapper)[]> {
  const documentQuery = query(getCollection<Doc>(collectionName));
  const querySnapshot = await getDocs(documentQuery);
  return querySnapshot.docs.map(mapDocumentToDto);
}
