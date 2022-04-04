import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  documentId,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  where,
} from 'firebase/firestore';
import { FirestoreDto, FirestoreId } from '../dtos/firestore';
import { firestoreMapper } from '../mappers/firestore.mapper';
import { FirebaseService } from './firebase.service';

const FIRESTORE_BATCH_MAX_SIZE = 10;

/**
 * Divide array into batches.
 * @param items Items array.
 */
function createBatches<T>(items: readonly T[]): T[][] {
  const batches = [];
  for (let i = 0; i < items.length; i += FIRESTORE_BATCH_MAX_SIZE) {
    batches.push(items.slice(i, i + FIRESTORE_BATCH_MAX_SIZE));
  }
  return batches;
}

export type FirestoreCollectionName = 'films' | 'characters' | 'planets';

export namespace FirestoreService {
  /**
   * Create typed collection.
   * @param db Firestore instance.
   * @param collectionName Collection name.
   */
  export function getCollection<T = DocumentData>(collectionName: FirestoreCollectionName): CollectionReference<T> {
    return collection(FirebaseService.db, collectionName) as CollectionReference<T>;
  }

  /**
   * Fetch many entities.
   * @param collectionName Collection name.
   * @param constraints Query constraints.
   */
  export async function fetchMany<T = DocumentData>(
    collectionName: FirestoreCollectionName,
    constraints: readonly QueryConstraint[] = [],
  ): Promise<FirestoreDto<T>[]> {
    const querySnapshot = await getDocs<T>(query(getCollection(collectionName), ...constraints));
    return querySnapshot.docs.map(firestoreMapper.toDto);
  }

  /**
   * Get a stream of documents queried by array of ids.
   * @param collectionName Collection name.
   * @param ids Entities ids.
   * @param constraints Query constraints.
   */
  export async function fetchManyByIds<T>(
    collectionName: FirestoreCollectionName,
    ids: readonly FirestoreId[],
  ): Promise<FirestoreDto<T>[]> {
    const batches = createBatches(ids);

    const snapshotPromises = batches.map(batch => {
      const entitiesQuery = query<T>(
        getCollection(collectionName),
        where(documentId(), 'in', batch),
      );
      return getDocs<T>(entitiesQuery);
    });

    const snapshots = await Promise.all(snapshotPromises);
    return snapshots.flatMap(snapshot => snapshot.docs.map(firestoreMapper.toDto));
  }

  /**
   * Fetch document snapshot.
   * @param collectionName Collection name.
   * @param id Document id.
   */
  export function fetchSnapshot<T = DocumentData>(
    collectionName: FirestoreCollectionName,
    id: FirestoreId,
  ): Promise<DocumentSnapshot<T>> {
    return getDoc(doc(getCollection<T>(collectionName), id));
  }

  /**
   * Fetch one entity.
   * @param collectionName Collection name.
   * @param id Document id.
   */
  export async function fetchOne<T = DocumentData>(
    collectionName: FirestoreCollectionName,
    id: FirestoreId,
  ): Promise<FirestoreDto<T>> {
    const querySnapshot = await fetchSnapshot<T>(collectionName, id);
    return firestoreMapper.toDto(querySnapshot);
  }
}
