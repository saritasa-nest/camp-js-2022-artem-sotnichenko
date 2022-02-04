import { fetchCharactersByIds } from '../character/fetch';
import { fetchFilmById } from '../film/fetch';
import { fetchPlanetsByIds } from '../planet/fetch';
import { fetchSpeciesByIds } from '../specie/fetch';
import { fetchStarshipsByIds } from '../starship/fetch';
import { fetchVehiclesByIds } from '../vehicle/fetch';

import { fromDto } from './mappers';
import { ConnectedFilm } from './types';

/**
 * Get film with all connections.
 * @param id Film id.
 */
export async function getConnectedFilm(id: string): Promise<ConnectedFilm> {
  const filmDto = await fetchFilmById(id);

  const characterDtos = await fetchCharactersByIds(filmDto.fields.characters);
  const specieDtos = await fetchSpeciesByIds(filmDto.fields.species);
  const starshipDtos = await fetchStarshipsByIds(filmDto.fields.starships);
  const vehicleDtos = await fetchVehiclesByIds(filmDto.fields.vehicles);
  const planetDtos = await fetchPlanetsByIds(filmDto.fields.planets);

  return fromDto(filmDto, { characterDtos, specieDtos, starshipDtos, vehicleDtos, planetDtos });
}
