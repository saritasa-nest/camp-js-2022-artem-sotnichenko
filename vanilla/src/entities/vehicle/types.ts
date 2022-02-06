import { FirebaseWrapper } from '../../firebase/types';

/** Vehicle data that stored in firestore. */
export interface VehicleDocument {

  /** Vehicle fields. */
  readonly fields: {

    /** Vehicle class. */
    readonly vehicle_class: string;
  };

  /** Model, collection name. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}

/** Vehicle DTO. */
export interface VehicleDto extends VehicleDocument, FirebaseWrapper {}

/** Vehicle model. */
export interface Vehicle {

  /** Vehicle class. */
  readonly class: string;

  /** Starship id. */
  readonly id: string;

  /** Model, collection name. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}
