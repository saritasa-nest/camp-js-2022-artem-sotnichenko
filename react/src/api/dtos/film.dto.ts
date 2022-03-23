import { FirestoreWrapper } from './firestore-wrapper.dto';

/** Film data that stored in firestore. */
export interface FilmDocument {

  /** Film fields. */
  readonly fields: {

    /** The title of this film. */
    readonly title: string;

    /** The opening paragraphs at the beginning of this film. */
    readonly opening_crawl: string;

    /** The name of the director of this film. */
    readonly director: string;

    /** The name(s) of the producer(s) of this film. Comma separated. */
    readonly producer: string;

    /** The ISO 8601 date format of film release at original creator country. */
    readonly release_date: string;

    /** An array of people ids that are in this film. */
    readonly characters: readonly string[];

    /** An array of planet ids that are in this film. */
    readonly planets: readonly string[];
  };
}

/** Film DTO. */
export interface FilmDto extends FilmDocument, FirestoreWrapper {}
