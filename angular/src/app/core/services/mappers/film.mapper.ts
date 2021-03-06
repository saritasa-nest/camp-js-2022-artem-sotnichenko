import { Injectable } from '@angular/core';

import { Film } from '../../models/film';
import { splitByComma } from '../../utils/split-by-comma';

import { FilmDto } from './dto/film.dto';

/**
 * Mapper for user entities.
 */
@Injectable({ providedIn: 'root' })
export class FilmMapper {
  /**
   * Maps Film DTO to Film model.
   * @param dto Film DTO.
   */
  public fromDto(dto: FilmDto): Film {
    return {
      id: dto.id,
      title: dto.fields.title,
      director: dto.fields.director,
      producers: splitByComma(dto.fields.producer),
      openingCrawl: dto.fields.opening_crawl,
      releaseDate: new Date(dto.fields.release_date),
      characterIds: dto.fields.characters,
      planetIds: dto.fields.planets,
    };
  }

  /**
   * Maps Film model to Film dto.
   * @param model Film model.
   */
  public toDto(model: Film): FilmDto {
    return {
      id: model.id,
      fields: {
        title: model.title,
        director: model.director,
        opening_crawl: model.openingCrawl,
        producer: model.producers.join(','),
        release_date: model.releaseDate.toISOString(),
        characters: model.characterIds,
        planets: model.planetIds,
      },
    };
  }
}
