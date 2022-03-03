import { FirebaseWrapper } from './firebase-wrapper.dto';

/** Character data that stored in firestore. */
export interface CharacterDocument {

  /** Character fields. */
  readonly fields: {

    /** The name of this person. */
    readonly name: string;

    /**
     * The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin.
     */
    readonly birth_year: string;

    /** The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye. */
    readonly eye_color: string;

    /** The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender. */
    readonly gender: string;

    /** An array of the hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair. */
    readonly hair_color: string;

    /** The height of the person in centimeters. */
    readonly height: string;

    /** The mass of the person in kilograms. */
    readonly mass: string;

    /** An array of the skin color of this person. */
    readonly skin_color: string;

    /** The planet id, a planet that this person was born on or inhabits. */
    readonly homeworld: string;
  };
}

/** Character DTO. */
export interface CharacterDto extends CharacterDocument, FirebaseWrapper {}
