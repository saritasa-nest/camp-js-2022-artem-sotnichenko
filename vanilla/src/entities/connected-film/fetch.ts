import { getDocs, query, where } from 'firebase/firestore';

import { FirebaseWrapper } from '../../firebase/types';
import { createCollection, mapDocumentToDto } from '../../firebase/utils';

/**
 * Fetch docs by id.
 * @param collectionName Name of collection to fetch from.
 * @param ids Doc ids.
 */
export async function fetchDocsByIds<Doc>(collectionName: string, ids: readonly string[]): Promise<(Doc & FirebaseWrapper)[]> {
  const querySnapshotsPromises = [];
  for (let i = 0; i < ids.length; i += 12) {
    const documentQuery = query(createCollection<Doc>(collectionName), where('__name__', 'in', ids.slice(i, i + 10)));
    const querySnapshot = getDocs<Doc>(documentQuery);
    querySnapshotsPromises.push(querySnapshot);
  }
  const querySnapshots = await Promise.all(querySnapshotsPromises);
  return querySnapshots.flatMap(querySnapshot => querySnapshot.docs.map(mapDocumentToDto));
}
