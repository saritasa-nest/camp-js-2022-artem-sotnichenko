import { fetchAll } from '../fetch';

import { PlanetMappers } from './mappers';
import { Planet, PlanetDto } from './types';

/**
 * Get all planets.
 */
export async function getAllPlanets(): Promise<Planet[]> {
  return (await fetchAll<PlanetDto>('planets')).map(PlanetMappers.fromDto);
}
