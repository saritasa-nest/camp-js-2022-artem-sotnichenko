import { Nullish } from '../utils/parse-nullish';

/** Character model. */
export interface Character {

  /** Character id. */
  readonly id: string;

  /** The name of this person. */
  readonly name: string;

  /**
   * The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin.
   */
  readonly birthYear: string;

  /** The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye. */
  readonly eyeColors: readonly string[];

  /** The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender. */
  readonly gender: string | Nullish;

  /** The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair. */
  readonly hairColors: readonly string[];

  /** The height of the person in centimeters. */
  readonly height: number | Nullish;

  /** The mass of the person in kilograms. */
  readonly mass: number | Nullish;

  /** The skin color of this person. */
  readonly skinColors: readonly string[];

  /** The planet id, a planet that this person was born on or inhabits. */
  readonly homeworldId: string;

}
