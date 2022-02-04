import { Starship, StarshipDto } from './types';

export namespace StarshipMappers {

  /** Maps Starship DTO to Starship model.
   * @param dto Starship DTO.
   */
  export function fromDto(dto: StarshipDto): Starship {
    return {
      MGLT: dto.fields.MGLT,
      hyperdriveRating: parseFloat(dto.fields.hyperdrive_rating),
      class: dto.fields.starship_class,
      id: dto.id,
      model: dto.model,
      pk: dto.pk,
    };
  }

  /** Maps Starship model to Starship document.
   * @param starship Starship model.
   */
  export function toDto(starship: Starship): StarshipDto {
    return {
      fields: {
        MGLT: starship.MGLT,
        hyperdrive_rating: String(starship.hyperdriveRating),
        starship_class: starship.class,
      },
      id: starship.id,
      model: starship.model,
      pk: starship.pk,
    };
  }
}
