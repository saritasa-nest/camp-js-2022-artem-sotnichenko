import { Nullish } from '../utils/parse-nullish';

/** Planet model. */
export interface Planet {

  /** Character id. */
  readonly id: string;

  /** The name of this planet. */
  readonly name: string;

  /** The diameter of this planet in kilometers. */
  readonly diameter: number | Nullish;

  /** The number of standard hours it takes for this planet to complete a single rotation on its axis. */
  readonly rotationPeriod: number | Nullish;

  /** The number of standard days it takes for this planet to complete a single orbit of its local star. */
  readonly orbitalPeriod: number | Nullish;

  /**
   * A number denoting the gravity of this planet,
   * where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs. .
   */
  readonly gravity: string | Nullish;

  /** The average population of sentient beings inhabiting this planet. */
  readonly population: number | Nullish;

  /** The climate of this planet. Comma separated if diverse. */
  readonly climate: string | Nullish;

  /** The percentage of the planet surface that is naturally occurring water or bodies of water. */
  readonly surfaceWater: string | Nullish;

  /** The terrain of this planet. Comma separated if diverse. */
  readonly terrain: readonly string[] | Nullish;
}
