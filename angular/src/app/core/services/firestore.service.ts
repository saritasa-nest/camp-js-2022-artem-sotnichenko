import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { doc, query, QueryConstraint } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable, of } from 'rxjs';

import { CollectionName, getCollection } from '../utils/firebase/get-collection-typed';

import { FilterOptions, PaginationDirection } from './film/utils/types';
import { FilmDocument } from './mappers/dto/film.dto';

/** Firestore service */
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
  public fetchEntities<T extends DocumentData>(collectionName: CollectionName, constraints: QueryConstraint[]): Observable<T[]> {
    return collectionData<T>(query(getCollection(this.db, collectionName), ...constraints), { idField: 'id' });
  }

  /**
   * Get query cursor that used for pagination.
   * @param db Firebase instance.
   * @param id Document id.
   */
  public getQueryCursorById(db: Firestore, id: string | null): Observable<DocumentData | ''> {
    return id ? docData(doc(getCollection(db, 'films'), id)) : of('');
  }
}
