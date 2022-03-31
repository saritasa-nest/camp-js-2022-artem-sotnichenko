import { FirestoreDocument, FirestoreDto } from './firestore';

/** Character data. */
interface CharacterData {
  /** The name of this planet. */
  readonly name: string;
}

export type CharacterDocument = FirestoreDocument<CharacterData>;

export type CharacterDto = FirestoreDto<CharacterDocument>;
