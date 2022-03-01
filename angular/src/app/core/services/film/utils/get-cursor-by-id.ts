import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { getCollection } from 'src/app/core/utils/firebase/get-collection-typed';

import { FilmDocument } from '../../mappers/dto/film.dto';

import { QueryCursor } from './types';

/**
 * Get query cursor that used for pagination.
 * @param db Firebase instance.
 * @param id Document id.
 */
// Prevents returning only promise, without async return signature would be `Promise<QueryCursor> | ''`
// eslint-disable-next-line require-await
export async function getQueryCursorById(db: Firestore, id: string | null): Promise<QueryCursor | ''> {
  return id ? getDoc(doc(getCollection<FilmDocument>(db, 'films'), id)) : '';
}
