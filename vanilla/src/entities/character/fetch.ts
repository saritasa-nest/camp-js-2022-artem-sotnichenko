import { fetchDocsByIds } from '../connected-film/fetch';

import { CharacterDto } from './types';

/**
 * Fetch characters by id.
 * @param ids Character ids.
 */
export function fetchCharactersByIds(ids: readonly string[]): Promise<CharacterDto[]> {
  return fetchDocsByIds('characters', ids);
}
