import { FilmCreate } from 'src/models/filmCreate';
import { FilmCreateDto } from '../dtos/filmCreate.dto';

/**
 * Film form mapper.
 */
class FilmCreateMapper {
  /**
   * Maps model to DTO.
   * @param model Film create model.
   */
  public toDto(model: FilmCreate): FilmCreateDto {
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

export const filmCreateMapper = new FilmCreateMapper();
