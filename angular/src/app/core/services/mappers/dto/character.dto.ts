import { FirebaseWrapper } from './firebase-wrapper.dto';

/** Character data that stored in firestore. */
export interface CharacterDocument {

  /** Character fields. */
  readonly fields: {

    /** The name of this person. */
    readonly name: string;
  };
}

/** Character DTO. */
export interface CharacterDto extends CharacterDocument, FirebaseWrapper {}
