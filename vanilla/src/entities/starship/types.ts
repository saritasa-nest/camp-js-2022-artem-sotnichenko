import { FirebaseWrapper } from '../../firebase/types';

/** Starship data that stored in firestore. */
export interface StarshipDocument {

  /** Starship fields. */
  readonly fields: {

    /**
     * Speed or size in megalights.
     *
     * Megalight, standard unit of distance in space.
     * */
    readonly MGLT: string;

    /** Hyperdrive rating, float. */
    readonly hyperdrive_rating: string;

    /** Starhip class. */
    readonly starship_class: string;
  };

  /** Model. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}

/** Starship DTO. */
export interface StarshipDto extends StarshipDocument, FirebaseWrapper {}

/** Starship model. */
export interface Starship {

  /**
   * Speed or size in megalights.
   *
   * Megalight, standard unit of distance in space.
   * */
  readonly MGLT: string;

  /** Hyperdrive rating, float. */
  readonly hyperdriveRating: number;

  /** Starhip class. */
  readonly class: string;

  /** Starship id. */
  readonly id: string;

  /** Model. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}
