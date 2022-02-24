/** Film model. */
export interface Film {

  /** Film id. */
  readonly id: string;

  /** The title of this film. */
  readonly title: string;

  /** The opening paragraphs at the beginning of this film. */
  readonly openingCrawl: string;

  /** The name of the director of this film. */
  readonly director: string;

  /** The name(s) of the producer(s) of this film. Comma separated. */
  readonly producers: readonly string[];

  /** The ISO 8601 date format of film release at original creator country. */
  readonly releaseDate: Date;

  /** An array of people ids that are in this film. */
  readonly characterIds: readonly string[];

  /** An array of planet ids that are in this film. */
  readonly planetIds: readonly string[];
}
