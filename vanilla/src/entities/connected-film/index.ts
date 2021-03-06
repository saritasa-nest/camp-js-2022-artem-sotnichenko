import { fetchFilmById } from '../film/fetch';
import { CharacterDocument } from '../character/types';
import { PlanetDocument } from '../planet/types';
import { SpeciesDocument } from '../species/types';
import { StarshipDocument } from '../starship/types';
import { VehicleDocument } from '../vehicle/types';

import { fetchDocsByIds } from './fetch';
import { fromDto } from './mappers';
import { ConnectedFilm } from './types';

/**
 * Get film with all connections.
 * @param id Film id.
 */
export async function getConnectedFilm(id: string): Promise<ConnectedFilm> {
  const filmDto = await fetchFilmById(id);

  const [
    characterDtos,
    speciesDtos,
    starshipDtos,
    vehicleDtos,
    planetDtos,
  ] = await Promise.all([
    fetchDocsByIds<CharacterDocument>('characters', filmDto.fields.characters),
    fetchDocsByIds<SpeciesDocument>('species', filmDto.fields.species),
    fetchDocsByIds<StarshipDocument>('starships', filmDto.fields.starships),
    fetchDocsByIds<VehicleDocument>('vehicles', filmDto.fields.vehicles),
    fetchDocsByIds<PlanetDocument>('planets', filmDto.fields.planets),
  ]);

  return fromDto(filmDto, { characterDtos, speciesDtos, starshipDtos, vehicleDtos, planetDtos });
}
