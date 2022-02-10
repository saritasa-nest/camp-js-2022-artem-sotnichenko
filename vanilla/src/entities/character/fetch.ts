import { fetchAllFromCollection } from '../fetch';

import { CharacterMappers } from './mappers';
import { Character, CharacterDto } from './types';

/**
 * Get all characters.
 */
export async function getAllCharacters(): Promise<Character[]> {
  return (await fetchAllFromCollection<CharacterDto>('characters')).map(CharacterMappers.fromDto);
}
