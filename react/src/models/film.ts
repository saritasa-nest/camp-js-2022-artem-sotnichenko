import { Immerable, OmitImmerable } from './immerable';

/** Film model. */
export class Film extends Immerable {
  /** Film id. */
  public readonly id: string;

  /** The title of this film. */
  public readonly title: string;

  /** The opening paragraphs at the beginning of this film. */
  public readonly openingCrawl: string;

  /** The name of the director of this film. */
  public readonly director: string;

  /** The name(s) of the producer(s) of this film. */
  public readonly producers: readonly string[];

  /** The Date of film release at original creator country. */
  public readonly releaseDate: Date;

  /** An array of people ids that are in this film. */
  public readonly characterIds: readonly string[];

  /** An array of planet ids that are in this film. */
  public readonly planetIds: readonly string[];

  public constructor(data: FilmInitArgs) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.openingCrawl = data.openingCrawl;
    this.director = data.director;
    this.producers = data.producers;
    this.releaseDate = data.releaseDate;
    this.characterIds = data.characterIds;
    this.planetIds = data.planetIds;
  }
}

type FilmInitArgs = OmitImmerable<Film>;
