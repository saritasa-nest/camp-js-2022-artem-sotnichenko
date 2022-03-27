import { FilmForm } from 'src/models/filmForm';
import { FilmFormDto } from '../dtos/filmForm.dto';

/**
 * Film form mapper.
 */
class FilmFormMapper {
  /**
   * Maps film form model to film form DTO.
   * @param model Film form model.
   */
  public toDto(model: FilmForm): FilmFormDto {
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

export const filmFormMapper = new FilmFormMapper();
