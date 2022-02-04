import { Film, FilmDto } from './types';

/** Maps Film DTO to Film model.
 * @param dto Film DTO.
 */
export function fromDto(dto: FilmDto): Film {
  return {
    id: dto.id,
    characterIds: dto.fields.characters,
    specieIds: dto.fields.species,
    starshipIds: dto.fields.starships,
    vehicleIds: dto.fields.vehicles,
    planetIds: dto.fields.planets,
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

/** Maps Film model to Film DTO.
 * @param film Film model.
 */
export function toDto(film: Film): FilmDto {
  return {
    fields: {
      characters: film.characterIds,
      species: film.specieIds,
      starships: film.starshipIds,
      vehicles: film.vehicleIds,
      planets: film.planetIds,
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
