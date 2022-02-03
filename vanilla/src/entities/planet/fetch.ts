import { fetchDocsByIds } from '../connected-film/fetch';

import { PlanetDto } from './types';

/**
 * Fetch Planets by id.
 * @param ids Planet ids.
 */
export function fetchPlanetsByIds(ids: readonly string[]): Promise<PlanetDto[]> {
  return fetchDocsByIds('planets', ids);
}
