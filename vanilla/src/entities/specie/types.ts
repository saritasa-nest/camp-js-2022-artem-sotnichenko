import { FirebaseWrapper } from '../../firebase/types';

/** Specie data that stored in firestore. */
export interface SpecieDocument {

  /** Specie fields. */
  readonly fields: {

    /** Average height in cm. */
    readonly average_height: string;

    /** Average lifespan, can be described by words. */
    readonly average_lifespan: string;

    /** Biological classification. */
    readonly classification: string;

    /** Creation date. */
    readonly created: string;

    /** Designation. */
    readonly designation: string;

    /** Edit date. */
    readonly edited: string;

    /** Eye color, can be array. */
    readonly eye_colors: string;

    /** Hair color, can be array. */
    readonly hair_colors: string;

    /** Homeworld pk. */
    readonly homeworld: number;

    /** Language. */
    readonly language: string;

    /** Name. */
    readonly name: string;
  };

  /** Model. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}

/** Specie DTO. */
export interface SpecieDto extends SpecieDocument, FirebaseWrapper {}

/** Specie model. */
export interface Specie {

  /** Average height in cm. */
  readonly averageHeight: number;

  /** Average lifespan, can be described by words. */
  readonly averageLifespan: string;

  /** Biological classification. */
  readonly classification: string;

  /** Designation. */
  readonly designation: string;

  /** Eye color, can be array. */
  readonly eyeColors: readonly string[];

  /** Hair color, can be array. */
  readonly hairColors: readonly string[];

  /** Homeworld pk. */
  readonly homeworld: number;

  /** Language. */
  readonly language: string;

  /** Name. */
  readonly name: string;

  /** Specie id. */
  readonly id: string;

  /** Creation date "2014-12-20T17:30:50.416Z". */
  readonly created: Date;

  /** Edit date "2014-12-20T17:30:50.416Z". */
  readonly edited: Date;

  /** Model. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}
