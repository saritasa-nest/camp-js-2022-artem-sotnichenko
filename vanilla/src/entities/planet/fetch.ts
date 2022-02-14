import { fetchAllFromCollection } from '../fetch';

import { PlanetMappers } from './mappers';
import { Planet, PlanetDto } from './types';

/**
 * Get all planets.
 */
export async function getAllPlanets(): Promise<Planet[]> {
  return (await fetchAllFromCollection<PlanetDto>('planets')).map(PlanetMappers.fromDto);
}
