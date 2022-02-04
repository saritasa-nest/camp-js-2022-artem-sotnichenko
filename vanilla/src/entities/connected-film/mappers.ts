import { CharacterMappers } from '../character/mappers';
import { CharacterDto } from '../character/types';
import { FilmDto } from '../film/types';
import { PlanetMappers } from '../planet/mappers';
import { PlanetDto } from '../planet/types';
import { SpeciesMappers } from '../species/mappers';
import { SpeciesDto } from '../species/types';
import { StarshipMappers } from '../starship/mappers';
import { StarshipDto } from '../starship/types';
import { VehicleMappers } from '../vehicle/mappers';
import { VehicleDto } from '../vehicle/types';

import { ConnectedFilm } from './types';

/**
 * Maps FilmDto to ConnectedFilm model.
 * @param dto Film DTO.
 * @param entitiesDtos Entities DTOs that need to be merged.
 */
export function fromDto(dto: FilmDto, {
  characterDtos,
  speciesDtos,
  starshipDtos,
  vehicleDtos,
  planetDtos,
}: {
  characterDtos: CharacterDto[];
  speciesDtos: SpeciesDto[];
  starshipDtos: StarshipDto[];
  vehicleDtos: VehicleDto[];
  planetDtos: PlanetDto[];
}): ConnectedFilm {
  return {
    id: dto.id,
    characters: characterDtos.map(CharacterMappers.fromDto),
    species: speciesDtos.map(SpeciesMappers.fromDto),
    starships: starshipDtos.map(StarshipMappers.fromDto),
    vehicles: vehicleDtos.map(VehicleMappers.fromDto),
    planets: planetDtos.map(PlanetMappers.fromDto),
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

/** Maps Connected film model to Film DTO.
 * @param film Film model.
 */
export function toDto(film: ConnectedFilm): FilmDto {
  return {
    fields: {
      characters: film.characters.map(character => character.id),
      species: film.species.map(species => species.id),
      starships: film.starships.map(starship => starship.id),
      vehicles: film.vehicles.map(vehicle => vehicle.id),
      planets: film.planets.map(planet => planet.id),
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
