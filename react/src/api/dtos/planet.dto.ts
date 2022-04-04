import { FirestoreDocument, FirestoreDto } from './firestore';

/** Planet data. */
interface PlanetData {
  /** The name of this planet. */
  readonly name: string;
}

export type PlanetDocument = FirestoreDocument<PlanetData>;

export type PlanetDto = FirestoreDto<PlanetDocument>;
