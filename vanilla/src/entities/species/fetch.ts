import { fetchAllFromCollection } from '../fetch';

import { SpeciesMappers } from './mappers';
import { Species, SpeciesDto } from './types';

/**
 * Get all Species.
 */
export async function getAllSpecies(): Promise<Species[]> {
  return (await fetchAllFromCollection<SpeciesDto>('species')).map(SpeciesMappers.fromDto);
}
