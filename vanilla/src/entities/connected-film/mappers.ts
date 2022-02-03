import { CharacterMappers } from '../character/mappers';
import { Character, CharacterDto } from '../character/types';
import { FilmDto } from '../film/types';

import { СonnectedFilm } from './types';

/**
 * Maps FilmDto to ConnectedFilm model.
 * @param dto Film DTO.
 * @param characterDtos Character DTOs.
 */
export function fromDto(dto: FilmDto, characterDtos: CharacterDto[]): СonnectedFilm {
  return {
    id: dto.id,
    characters: characterDtos.map(CharacterMappers.fromDto),
    specieIds: dto.fields.species,
    starshipIds: dto.fields.starships,
    vehicleIds: dto.fields.vehicles,
    created: new Date(dto.fields.created),
    director: dto.fields.director,
    edited: new Date(dto.fields.edited),
    episodeId: dto.fields.episode_id,
    openingCrawl: dto.fields.opening_crawl,
    producer: dto.fields.producer,
    releaseDate: new Date(dto.fields.release_date),
    title: dto.fields.title,
    model: dto.model,
    pk: dto.pk,
  };
}

/** Maps Film model to Film document.
 * @param film Film model.
 */
export function toDto(film: СonnectedFilm): FilmDto {
  return {
    fields: {
      characters: film.characters.map(character => character.id),
      species: film.specieIds,
      starships: film.starshipIds,
      vehicles: film.vehicleIds,
      created: film.created.toISOString(),
      director: film.director,
      edited: film.edited.toISOString(),
      episode_id: film.episodeId,
      opening_crawl: film.openingCrawl,
      producer: film.producer,
      release_date: film.releaseDate.toISOString(),
      title: film.title,
    },
    id: film.id,
    model: film.model,
    pk: film.pk,
  };
}
