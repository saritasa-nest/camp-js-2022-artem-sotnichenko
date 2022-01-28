import { FirebaseWrapper } from '../../firebase/types';

/** Film data that stored in firestore. */
export interface FilmDocument {

  /** Film fields. */
  fields: {

    /** Character ids. */
    characters: string[];

    /** Specie ids. */
    species: string[];

    /** Starship ids. */
    starships: string[];

    /** Vehicle ids. */
    vehicles: string[];

    /** Create time (2014-12-10T14:23:31.880Z). */
    created: string;

    /** Director name. */
    director: string;

    /** Edit time. */
    edited: string;

    /** Episode id. */
    episode_id: 4;

    /** Opening crawl. */
    opening_crawl: string;

    /** Producer name. */
    producer: string;

    /** Release date (1977-05-25). */
    release_date: string;

    /** Title. */
    title: string;
  };

  /** Model. */
  model: string;

  /** Primary key. */
  pk: number;
}

/** Film DTO. */
export interface FilmDto extends FilmDocument, FirebaseWrapper {}

/** Film model. */
export interface Film {

  /** Film id. */
  id: string;

  /** Character ids. */
  characters: string[];

  /** Specie ids. */
  species: string[];

  /** Starship ids. */
  starships: string[];

  /** Vehicle ids. */
  vehicles: string[];

  /** Create time (2014-12-10T14:23:31.880Z). */
  created: string;

  /** Director name. */
  director: string;

  /** Edit time. */
  edited: string;

  /** Episode id. */
  episodeId: 4;

  /** Opening crawl. */
  openingCrawl: string;

  /** Producer name. */
  producer: string;

  /** Release date (1977-05-25). */
  releaseDate: string;

  /** Title. */
  title: string;

  /** Model. */
  model: string;

  /** Primary key. */
  pk: number;
}
