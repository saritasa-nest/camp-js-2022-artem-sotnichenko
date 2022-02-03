import { fetchCharactersByIds } from '../character/fetch';
import { fetchFilmById } from '../film/fetch';

import { fromDto } from './mappers';
import { СonnectedFilm } from './types';

/**
 * Get film with all connections.
 * @param id Film id.
 */
export async function getConnectedFilm(id: string): Promise<СonnectedFilm> {
  const filmDto = await fetchFilmById(id);
  const characterDtos = await fetchCharactersByIds(filmDto.fields.characters);
  return fromDto(filmDto, characterDtos);
}
