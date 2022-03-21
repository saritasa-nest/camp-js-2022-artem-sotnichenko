import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
} from 'firebase/firestore';
import { FirestoreWrapper } from '../dtos/firestore-wrapper.dto';
import { FirebaseService } from './firebase.service';

export namespace FirestoreService {
  export type CollectionName = 'films' | 'characters' | 'planets';

  /**
   * Create typed collection.
   * @param db Firestore instance.
   * @param collectionName Collection name.
   */
  export function getCollection<T = DocumentData>(collectionName: CollectionName): CollectionReference<T> {
    return collection(FirebaseService.db, collectionName) as CollectionReference<T>;
  }

  /**
   * Fetch many entities.
   * @param collectionName Collection name.
   * @param constraints Query constraints.
   */
  export async function fetchMany<T = DocumentData>(
    collectionName: CollectionName,
    constraints: readonly QueryConstraint[] = [],
  ): Promise<(T & FirestoreWrapper)[]> {
    const querySnapshot = await getDocs<T>(query(getCollection(collectionName), ...constraints));
    return querySnapshot.docs.map(documentSnapshot => ({ ...documentSnapshot.data(), id: documentSnapshot.id }));
  }

  /**
   * Fetch document snapshot.
   * @param collectionName Collection name.
   * @param id Document id.
   */
  export function fetchSnapshot<T = DocumentData>(
    collectionName: CollectionName,
    id: string,
  ): Promise<DocumentSnapshot<T>> {
    return getDoc(doc(getCollection<T>(collectionName), id));
  }
}