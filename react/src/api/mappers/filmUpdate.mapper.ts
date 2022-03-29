import { FilmUpdate } from 'src/models/filmUpdate';
import { FilmUpdateDto } from '../dtos/filmUpdate.dto';

/**
 * Film form mapper.
 */
class FilmUpdateMapper {
  /**
   * Maps model to DTO.
   * @param model Film update model.
   */
  public toDto(model: FilmUpdate): FilmUpdateDto {
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

export const filmUpdateMapper = new FilmUpdateMapper();
