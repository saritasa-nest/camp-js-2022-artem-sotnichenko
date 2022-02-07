import { fetchAll } from '../fetch';

import { CharacterMappers } from './mappers';
import { Character, CharacterDto } from './types';

/**
 * Get all characters.
 */
export async function getAllCharacters(): Promise<Character[]> {
  return (await fetchAll<CharacterDto>('characters')).map(CharacterMappers.fromDto);
}
