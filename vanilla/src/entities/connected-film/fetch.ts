import { getDocs, query, where } from 'firebase/firestore';

import { FirebaseWrapper } from '../../firebase/types';
import { CollectionName, getCollection, mapDocumentToDto } from '../../firebase/utils';
import { FIRESTORE_FETCH_BATCH_SIZE } from '../../utils/constants';

/**
 * Fetch docs by id.
 * @param collectionName Name of collection to fetch from.
 * @param ids Doc ids.
 */
export async function fetchDocsByIds<Doc>(collectionName: CollectionName, ids: readonly string[]): Promise<(Doc & FirebaseWrapper)[]> {
  const querySnapshotsPromises = [];

  for (let i = 0; i < ids.length; i += FIRESTORE_FETCH_BATCH_SIZE) {
    const documentQuery = query(
      getCollection<Doc>(collectionName),
      where('__name__', 'in', ids.slice(i, i + FIRESTORE_FETCH_BATCH_SIZE)),
    );
    const querySnapshot = getDocs<Doc>(documentQuery);

    querySnapshotsPromises.push(querySnapshot);
  }

  const querySnapshots = await Promise.all(querySnapshotsPromises);
  return querySnapshots.flatMap(querySnapshot => querySnapshot.docs.map(mapDocumentToDto));
}
