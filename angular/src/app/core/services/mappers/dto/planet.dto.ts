import { FirebaseWrapper } from './firebase-wrapper.dto';

/** Planet data that stored in firestore. */
export interface PlanetDocument {

  /** Planet fields. */
  readonly fields: {

    /** The name of this planet. */
    readonly name: string;

    /** The diameter of this planet in kilometers. */
    readonly diameter: string;

    /** The number of standard hours it takes for this planet to complete a single rotation on its axis. */
    readonly rotation_period: string;

    /** The number of standard days it takes for this planet to complete a single orbit of its local star. */
    readonly orbital_period: string;

    /**
     * A number denoting the gravity of this planet,
     * where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs. .
     */
    readonly gravity: string;

    /** The average population of sentient beings inhabiting this planet. */
    readonly population: string;

    /** The climate of this planet. Comma separated if diverse. */
    readonly climate: string;

    /** The percentage of the planet surface that is naturally occurring water or bodies of water. */
    readonly surface_water: string;

    /** The terrain of this planet. Comma separated if diverse. */
    readonly terrain: string;
  };
}

/** Planet DTO. */
export interface PlanetDto extends PlanetDocument, FirebaseWrapper {}
