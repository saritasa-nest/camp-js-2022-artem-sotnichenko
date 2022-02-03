import { Specie, SpecieDto } from './types';

export namespace SpecieMappers {

  /** Maps Specie DTO to Specie model.
   * @param dto Specie DTO.
   */
  export function fromDto(dto: SpecieDto): Specie {
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

  /** Maps Specie model to Specie document.
   * @param specie Specie model.
   */
  export function toDto(specie: Specie): SpecieDto {
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
