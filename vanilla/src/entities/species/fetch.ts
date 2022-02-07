import { fetchAll } from '../fetch';

import { SpeciesMappers } from './mappers';
import { Species, SpeciesDto } from './types';

/**
 * Get all Species.
 */
export async function getAllSpecies(): Promise<Species[]> {
  return (await fetchAll<SpeciesDto>('species')).map(SpeciesMappers.fromDto);
}
