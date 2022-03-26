/** Firestore id. */
export type FirestoreId = string;

/** Firestore document. */
export interface FirestoreDocument<T> {
  /** Document fields. */
  fields: T;
}

/** Firestore DTO. */
export type FirestoreDto<T> = T & { id: FirestoreId; };
