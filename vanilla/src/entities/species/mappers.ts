import { Species, SpeciesDto } from './types';

export namespace SpecieMappers {

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
   * @param specie Species model.
   */
  export function toDto(specie: Species): SpeciesDto {
    return {
      fields: {
        average_height: String(specie.averageHeight),
        average_lifespan: specie.averageLifespan,
        classification: specie.classification,
        designation: specie.designation,
        eye_colors: specie.eyeColors.join(','),
        hair_colors: specie.hairColors.join(','),
        homeworld: specie.homeworld,
        language: specie.language,
        name: specie.name,
        created: specie.created.toISOString(),
        edited: specie.edited.toISOString(),
      },
      id: specie.id,
      model: specie.model,
      pk: specie.pk,
    };
  }
}
