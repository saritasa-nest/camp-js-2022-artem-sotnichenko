import { FirebaseWrapper } from './firebase-wrapper.dto';

/** Planet data that stored in firestore. */
export interface PlanetDocument {

  /** Planet fields. */
  readonly fields: {

    /** The name of this planet. */
    readonly name: string;
  };
}

/** Planet DTO. */
export interface PlanetDto extends PlanetDocument, FirebaseWrapper {}
