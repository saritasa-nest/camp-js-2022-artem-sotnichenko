import { fetchFilmById } from '../film/fetch';
import { CharacterDocument } from '../character/types';
import { PlanetDocument } from '../planet/types';
import { SpecieDocument } from '../specie/types';
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

  const characterDtos = await fetchDocsByIds<CharacterDocument>('characters', filmDto.fields.characters);
  const specieDtos = await fetchDocsByIds<SpecieDocument>('species', filmDto.fields.species);
  const starshipDtos = await fetchDocsByIds<StarshipDocument>('starships', filmDto.fields.starships);
  const vehicleDtos = await fetchDocsByIds<VehicleDocument>('vehicles', filmDto.fields.vehicles);
  const planetDtos = await fetchDocsByIds<PlanetDocument>('planets', filmDto.fields.planets);

  return fromDto(filmDto, { characterDtos, specieDtos, starshipDtos, vehicleDtos, planetDtos });
}
