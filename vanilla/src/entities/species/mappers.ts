import { Species, SpeciesDto } from './types';

export namespace SpeciesMappers {

  /**
   * Maps Species DTO to Species model.
   * @param dto Species DTO.
   */
  export function fromDto(dto: SpeciesDto): Species {
    return {
      id: dto.id,
      averageHeight: parseFloat(dto.fields.average_height),
      averageLifespan: dto.fields.average_lifespan,
      classification: dto.fields.classification,
      designation: dto.fields.designation,
      eyeColors: dto.fields.eye_colors.split(','),
      hairColors: dto.fields.hair_colors.split(','),
      homeworld: dto.fields.homeworld,
      language: dto.fields.language,
      name: dto.fields.name,
      created: new Date(dto.fields.created),
      edited: new Date(dto.fields.edited),
      model: dto.model,
      pk: dto.pk,
    };
  }

  /**
   * Maps Species model to Species DTO.
   * @param species Species model.
   */
  export function toDto(species: Species): SpeciesDto {
    return {
      fields: {
        average_height: String(species.averageHeight),
        average_lifespan: species.averageLifespan,
        classification: species.classification,
        designation: species.designation,
        eye_colors: species.eyeColors.join(','),
        hair_colors: species.hairColors.join(','),
        homeworld: species.homeworld,
        language: species.language,
        name: species.name,
        created: species.created.toISOString(),
        edited: species.edited.toISOString(),
      },
      id: species.id,
      model: species.model,
      pk: species.pk,
    };
  }
}
