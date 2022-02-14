import { fetchAllFromCollection } from '../fetch';

import { StarshipMappers } from './mappers';
import { Starship, StarshipDto } from './types';

/**
 * Get all starships.
 */
export async function getAllStarships(): Promise<Starship[]> {
  return (await fetchAllFromCollection<StarshipDto>('starships')).map(StarshipMappers.fromDto);
}
