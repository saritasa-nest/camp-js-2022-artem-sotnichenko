import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { doc, documentId, query, QueryConstraint, where } from 'firebase/firestore';
import { docData, doc as fromDocRef } from 'rxfire/firestore';
import { combineLatest, first, map, Observable, of } from 'rxjs';

import { QueryCursor } from '../film/utils/types';
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
   * Fetch entities.
   * @param collectionName Collection name.
   * @param constraints Query constraints.
   */
  public fetchMany<T extends FirebaseWrapper>(
    collectionName: CollectionName,
    constraints: readonly QueryConstraint[] = [],
  ): Observable<T[]> {
    return collectionData(query<T>(getCollection(this.db, collectionName), ...constraints), { idField: 'id' });
  }

  /**
   * Fetch entities by ids array.
   * @param collectionName Collection name.
   * @param ids Entities ids.
   * @param constraints Query constraints.
   */
  public fetchManyByIds<T extends FirebaseWrapper>(
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
   * Fetch one entity.
   * @param collectionName Collection  name.
   * @param id Document id.
   */
  public fetchOne<T extends FirebaseWrapper>(collectionName: CollectionName, id: string): Observable<T> {
    return docData(doc<T>(getCollection(this.db, collectionName), id), { idField: 'id' });
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
