import { Planet, PlanetDto } from './types';

export namespace PlanetMappers {

  /** Maps Planet DTO to Planet model.
   * @param dto Planet DTO.
   */
  export function fromDto(dto: PlanetDto): Planet {
    return {
      id: dto.id,
      climate: dto.fields.climate,
      diameter: dto.fields.diameter,
      gravity: dto.fields.gravity,
      name: dto.fields.name,
      orbitalPeriod: parseFloat(dto.fields.orbital_period),
      population: parseFloat(dto.fields.population),
      rotationPeriod: parseFloat(dto.fields.rotation_period),
      surfaceWater: parseFloat(dto.fields.surface_water),
      terrain: dto.fields.terrain,
      created: new Date(dto.fields.created),
      edited: new Date(dto.fields.edited),
      model: dto.model,
      pk: dto.pk,
    };
  }

  /** Maps Planet model to Planet document.
   * @param planet Planet model.
   */
  export function toDto(planet: Planet): PlanetDto {
    return {
      fields: {
        climate: planet.climate,
        diameter: planet.diameter,
        gravity: planet.gravity,
        name: planet.name,
        orbital_period: String(planet.orbitalPeriod),
        population: String(planet.population),
        rotation_period: String(planet.rotationPeriod),
        surface_water: String(planet.surfaceWater),
        terrain: planet.terrain,
        created: planet.created.toISOString(),
        edited: planet.edited.toISOString(),
      },
      id: planet.id,
      model: planet.model,
      pk: planet.pk,
    };
  }
}
