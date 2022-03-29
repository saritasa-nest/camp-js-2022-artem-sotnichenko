import { FilmCreate } from 'src/models/filmCreate';
import { FilmUpdate } from 'src/models/filmUpdate';
import { Film } from '../../models/film';
import { splitByComma } from '../../utils/splitByComma';
import { FilmCreateDto, FilmDto, FilmUpdateDto } from '../dtos/film.dto';

/**
 * Film mapper.
 */
class FilmMapper {
  /**
   * Maps film DTO to film model.
   * @param dto Film DTO.
   */
  public fromDto(dto: FilmDto): Film {
    return new Film({
      id: dto.id,
      title: dto.fields.title,
      director: dto.fields.director,
      producers: splitByComma(dto.fields.producer),
      openingCrawl: dto.fields.opening_crawl,
      releaseDate: new Date(dto.fields.release_date),
      characterIds: dto.fields.characters,
      planetIds: dto.fields.planets,
    });
  }

  /**
   * Maps film model to film DTO.
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

  /**
   * Maps model to DTO.
   * @param model Film create model.
   */
  public createDataToDto(model: FilmCreate): FilmCreateDto {
    return {
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

  /**
   * Maps model to DTO.
   * @param model Film update model.
   */
  public updateDataToDto(model: FilmUpdate): FilmUpdateDto {
    return {
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

export const filmMapper = new FilmMapper();
