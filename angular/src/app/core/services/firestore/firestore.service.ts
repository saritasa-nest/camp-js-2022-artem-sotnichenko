import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, deleteDoc, doc, documentId, DocumentReference, getDoc, query, QueryConstraint, UpdateData, updateDoc, where } from 'firebase/firestore';
import { docData, doc as fromDocRef } from 'rxfire/firestore';
import { combineLatest, first, from, map, Observable, of, switchMap } from 'rxjs';

import { QueryCursor } from '../films/utils/types';
import { FirebaseWrapper } from '../mappers/dto/firebase-wrapper.dto';

import { CollectionName, getCollection } from './utils/get-collection-typed';

const FIRESTORE_BATCH_MAX_SIZE = 10;

/** Firestore service. */
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  public constructor(
    private readonly db: Firestore,
  ) {}

  /**
   * Create entity.
   * @param collectionName Collection name.
   * @param data An Object containing the data for the new document.
   * @returns Reference of object from store.
   */
  public create<T>(
    collectionName: CollectionName,
    data: unknown,
  ): Observable<T> {
    return from(
      addDoc(getCollection(this.db, collectionName), data),
    ).pipe(
      switchMap(docRef => docData(docRef as DocumentReference<T>, { idField: 'id' })),
    );
  }

  /**
   * Update entity.
   * @param collectionName Collection name.
   * @param id Entity id.
   * @param data An Object containing the data for the new document.
   * @returns Reference of object from store.
   */
  public update(
    collectionName: CollectionName,
    id: string,
    data: UpdateData<unknown>,
  ): Observable<void> {
    const docRef = doc(getCollection(this.db, collectionName), id);
    return from(updateDoc(docRef, data));
  }

  /**
   * Delete entity.
   * @param collectionName Collection name.
   * @param id Entity id.
   */
  public delete(
    collectionName: CollectionName,
    id: string,
  ): Observable<void> {
    return from(deleteDoc(doc(getCollection(this.db, collectionName), id)));
  }

  /**
   * Get a stream of documents narrowed by array of constraints.
   * @param collectionName Collection name.
   * @param constraints Query constraints.
   */
  public getMany<T extends FirebaseWrapper>(
    collectionName: CollectionName,
    constraints: readonly QueryConstraint[] = [],
  ): Observable<T[]> {
    return collectionData(query<T>(getCollection(this.db, collectionName), ...constraints), { idField: 'id' });
  }

  /**
   * Get a stream of documents queried by array of ids.
   * @param collectionName Collection name.
   * @param ids Entities ids.
   * @param constraints Query constraints.
   */
  public getManyByIds<T extends FirebaseWrapper>(
    collectionName: CollectionName,
    ids: readonly string[],
  ): Observable<T[]> {
    const entitiesBatches = [];

    for (let i = 0; i < ids.length; i += FIRESTORE_BATCH_MAX_SIZE) {
      const entities$ = collectionData(query<T>(
        getCollection(this.db, collectionName),
        where(documentId(), 'in', ids.slice(i, i + FIRESTORE_BATCH_MAX_SIZE)),
      ), { idField: 'id' });
      entitiesBatches.push(entities$);
    }

    return combineLatest(entitiesBatches).pipe(map(entities => entities.flat()));
  }

  /**
   * Get a stream of a document.
   * @param collectionName Collection  name.
   * @param id Document id.
   */
  public getOneById<T extends FirebaseWrapper>(collectionName: CollectionName, id: string): Observable<T> {
    return of(doc<T>(getCollection(this.db, collectionName), id)).pipe(
      switchMap(docRef => getDoc(docRef)),
      map(snapshot => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...snapshot.data()!,
        id: snapshot.id,
      })),
    );
  }

  /**
   * Get query cursor that used for pagination.
   * @param collectionName Collection  name.
   * @param id Document id.
   */
  public getQueryCursorById<T extends FirebaseWrapper>(collectionName: CollectionName, id: string | null): Observable<QueryCursor<T>> {
    return id ? fromDocRef(doc(getCollection<T>(this.db, collectionName), id)).pipe(first()) : of(null);
  }
}
