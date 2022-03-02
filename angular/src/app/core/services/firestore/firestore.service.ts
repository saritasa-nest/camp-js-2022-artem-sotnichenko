import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { doc, query, QueryConstraint } from 'firebase/firestore';
import { docData, doc as fromDocRef } from 'rxfire/firestore';
import { first, Observable, of } from 'rxjs';

import { QueryCursor } from '../film/utils/types';
import { FirebaseWrapper } from '../mappers/dto/firebase-wrapper.dto';

import { CollectionName, getCollection } from './utils/get-collection-typed';

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
   * @param collectionName Collection  name.
   * @param constraints Query constraints.
   */
  public fetchMany<T extends FirebaseWrapper>(collectionName: CollectionName, constraints: QueryConstraint[]): Observable<T[]> {
    return collectionData(query<T>(getCollection(this.db, collectionName), ...constraints), { idField: 'id' });
  }

  /**
   * Fetch one entity.
   * @param collectionName Collection  name.
   * @param id Document id.
   */
  public fetchOne<T extends FirebaseWrapper>(collectionName: CollectionName, id: string): Observable<T> {
    return docData(doc<T>(getCollection(this.db, collectionName), id));
  }

  /**
   * Get query cursor that used for pagination.
   * @param collectionName Collection  name.
   * @param id Document id.
   */
  public getQueryCursorById<T extends FirebaseWrapper>(collectionName: CollectionName, id: string | null): Observable<QueryCursor<T>> {
    return id ? fromDocRef(doc(getCollection<T>(this.db, collectionName), id)).pipe(first()) : of('');
  }
}
