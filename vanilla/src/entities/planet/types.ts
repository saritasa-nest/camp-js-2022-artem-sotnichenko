import { FirebaseWrapper } from '../../firebase/types';

/** Planet data that stored in firestore. */
export interface PlanetDocument {

  /** Planet fields. */
  readonly fields: {

    /** Climate descriptive word. */
    readonly climate: string;

    /** Creation date "2014-12-20T17:30:50.416Z". */
    readonly created: string;

    /** Diameter in units. */
    readonly diameter: string;

    /** Edit date "2014-12-20T17:30:50.416Z". */
    readonly edited: string;

    /** Gravity string. */
    readonly gravity: string;

    /** Name. */
    readonly name: string;

    /** Time a astronomical object takes to complete one orbit around another object. */
    readonly orbital_period: string;

    /** Population. */
    readonly population: string;

    /** Time a object takes to complete a single revolution around its axis of rotation. */
    readonly rotation_period: string;

    /** Percent of surface covered by water. */
    readonly surface_water: string;

    /** Terrain type. */
    readonly terrain: string;
  };

  /** Model. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}

/** Planet DTO. */
export interface PlanetDto extends PlanetDocument, FirebaseWrapper {}

/** Planet model. */
export interface Planet {

  /** Film id. */
  readonly id: string;

  /** Climate descriptive word. */
  readonly climate: string;

  /** Diameter in units. */
  readonly diameter: string;

  /** Gravity string. */
  readonly gravity: string;

  /** Name. */
  readonly name: string;

  /** Time a astronomical object takes to complete one orbit around another object. */
  readonly orbitalPeriod: number;

  /** Population. */
  readonly population: number;

  /** Time a object takes to complete a single revolution around its axis of rotation. */
  readonly rotationPeriod: number;

  /** Percent of surface covered by water. */
  readonly surfaceWater: number;

  /** Terrain type. */
  readonly terrain: string;

  /** Creation date "2014-12-20T17:30:50.416Z". */
  readonly created: Date;

  /** Edit date "2014-12-20T17:30:50.416Z". */
  readonly edited: Date;

  /** Model. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}
