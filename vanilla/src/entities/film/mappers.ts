import { Film, FilmDto, FilmDocument } from './types';

/** Maps Film DTO to Film model.
 * @param dto Film DTO.
 */
export function toModel(dto: FilmDto): Film {
  return {
    id: dto.id,
    characters: dto.fields.characters,
    species: dto.fields.species,
    starships: dto.fields.starships,
    vehicles: dto.fields.vehicles,
    created: dto.fields.created,
    director: dto.fields.director,
    edited: dto.fields.edited,
    episodeId: dto.fields.episode_id,
    openingCrawl: dto.fields.opening_crawl,
    producer: dto.fields.producer,
    releaseDate: dto.fields.release_date,
    title: dto.fields.title,
    model: dto.model,
    pk: dto.pk,
  };
}

/** Maps Film model to Film document.
 * @param film Film model.
 */
export function toDoc(film: Film): FilmDocument {
  return {
    fields: {
      characters: film.characters,
      species: film.species,
      starships: film.starships,
      vehicles: film.vehicles,
      created: film.created,
      director: film.director,
      edited: film.edited,
      episode_id: film.episodeId,
      opening_crawl: film.openingCrawl,
      producer: film.producer,
      release_date: film.releaseDate,
      title: film.title,
    },
    model: film.model,
    pk: film.pk,
  };
}
