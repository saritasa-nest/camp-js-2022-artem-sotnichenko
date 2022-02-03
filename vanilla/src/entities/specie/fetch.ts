import { fetchDocsByIds } from '../connected-film/fetch';

import { SpecieDto } from './types';

/**
 * Fetch species by id.
 * @param ids Specie ids.
 */
export function fetchSpeciesByIds(ids: readonly string[]): Promise<SpecieDto[]> {
  return fetchDocsByIds('species', ids);
}
