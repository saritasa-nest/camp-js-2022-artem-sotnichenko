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

export type FirestoreCollectionName = 'films' | 'characters' | 'planets';

export namespace FirestoreService {
  export const FIRESTORE_BATCH_MAX_SIZE = 10;

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
  export async function getManyByIds<T>(
    collectionName: FirestoreCollectionName,
    ids: readonly FirestoreId[],
  ): Promise<FirestoreDto<T>[]> {
    const entitiesBatches = [];

    for (let i = 0; i < ids.length; i += FIRESTORE_BATCH_MAX_SIZE) {
      const entitiesQuery = query<T>(
        getCollection(collectionName),
        where(documentId(), 'in', ids.slice(i, i + FIRESTORE_BATCH_MAX_SIZE)),
      );
      entitiesBatches.push(getDocs<T>(entitiesQuery));
    }

    const entities = await Promise.all(entitiesBatches);

    return entities.flatMap(snapshot => snapshot.docs.map(firestoreMapper.toDto));
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
