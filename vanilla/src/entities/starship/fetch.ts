import { fetchDocsByIds } from '../connected-film/fetch';

import { StarshipDto } from './types';

/**
 * Fetch Starships by id.
 * @param ids Starship ids.
 */
export function fetchStarshipsByIds(ids: readonly string[]): Promise<StarshipDto[]> {
  return fetchDocsByIds('starships', ids);
}
