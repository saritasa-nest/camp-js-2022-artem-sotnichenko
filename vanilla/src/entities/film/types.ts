import { FirebaseWrapper } from '../../firebase/types';

/** Fields to sort in firebase. */
export enum SortField {
  Title = 'fields.title',
  Producer = 'fields.producer',
  Director = 'fields.director',
  ReleaseDate = 'fields.release_date',
}

/** Sort types in firebase. */
export enum SortType {
  Ascending = 'asc',
  Descending = 'desc',
}

/** Film data that stored in firestore. */
export interface FilmDocument {

  /** Film fields. */
  readonly fields: {

    /** Character ids. */
    readonly characters: readonly string[];

    /** Specie ids. */
    readonly species: readonly string[];

    /** Starship ids. */
    readonly starships: readonly string[];

    /** Vehicle ids. */
    readonly vehicles: readonly string[];

    /** Planet ids. */
    readonly planets: readonly string[];

    /** Create time (2014-12-10T14:23:31.880Z). */
    readonly created: string;

    /** Director name. */
    readonly director: string;

    /** Edit time. */
    readonly edited: string;

    /** Episode id. */
    readonly episode_id: number;

    /** Opening crawl. */
    readonly opening_crawl: string;

    /** Producer name. */
    readonly producer: string;

    /** Release date (1977-05-25). */
    readonly release_date: string;

    /** Title. */
    readonly title: string;
  };

  /** Model. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}

/** Film DTO. */
export interface FilmDto extends FilmDocument, FirebaseWrapper {}

/** Film model. */
export interface Film {

  /** Film id. */
  readonly id: string;

  /** Character ids. */
  readonly characterIds: readonly string[];

  /** Specie ids. */
  readonly specieIds: readonly string[];

  /** Starship ids. */
  readonly starshipIds: readonly string[];

  /** Vehicle ids. */
  readonly vehicleIds: readonly string[];

  /** Planet ids. */
  readonly planetIds: readonly string[];

  /** Create time (2014-12-10T14:23:31.880Z). */
  readonly created: Date;

  /** Director name. */
  readonly director: string;

  /** Edit time. */
  readonly edited: Date;

  /** Episode id. */
  readonly episodeId: number;

  /** Opening crawl. */
  readonly openingCrawl: string;

  /** Producer name. */
  readonly producer: string;

  /** Release date (1977-05-25). */
  readonly releaseDate: Date;

  /** Title. */
  readonly title: string;

  /** Model. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}
