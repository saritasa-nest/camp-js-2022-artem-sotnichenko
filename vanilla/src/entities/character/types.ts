import { FirebaseWrapper } from '../../firebase/types';

/** Character data that stored in firestore. */
export interface CharacterDocument {

  /** Character fields. */
  readonly fields: {

    /** Birth year. */
    readonly birth_year: string;

    /** Creation date "2014-12-20T17:30:50.416Z". */
    readonly created: string;

    /** Edit date "2014-12-20T17:30:50.416Z". */
    readonly edited: string;

    /** Eye color, can be array divided by ",". */
    readonly eye_color: string;

    /** Gender. */
    readonly gender: string;

    /** Hair color, can be array. */
    readonly hair_color: string;

    /** Height in cm. */
    readonly height: string;

    /** Home world. */
    readonly homeworld: number;

    /** Mass in kg. */
    readonly mass: string;

    /** Name. */
    readonly name: string;

    /** Skin color, can be array. */
    readonly skin_color: string;
  };

  /** Model, collection name. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}

/** Character DTO. */
export interface CharacterDto extends CharacterDocument, FirebaseWrapper {}

/** Character model. */
export interface Character {

  /** Character id. */
  readonly id: string;

  /** Birth year (102BBY). */
  readonly birthYear: string;

  /** Eye color. */
  readonly eyeColor: readonly string[];

  /** Gender. */
  readonly gender: string;

  /** Hair color. */
  readonly hairColor: readonly string[];

  /** Height in cm. */
  readonly height: number;

  /** Mass in kg. */
  readonly mass: number;

  /** Name. */
  readonly name: string;

  /** Home world. */
  readonly homeworld: number;

  /** Skin color, can be array. */
  readonly skinColor: readonly string[];

  /** Creation date "2014-12-20T17:30:50.416Z". */
  readonly created: Date;

  /** Edit date "2014-12-20T17:30:50.416Z". */
  readonly edited: Date;

  /** Model, collection name. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}
