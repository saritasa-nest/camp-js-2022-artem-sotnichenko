import { Injectable } from '@angular/core';

import { Planet } from '../../models/planet';
import { parseFromNullish, parseToNullish } from '../../utils/parse-nullish';
import { splitByComma } from '../../utils/split-by-comma';

import { PlanetDto } from './dto/planet.dto';

/**
 * Mapper for user entities.
 */
@Injectable({ providedIn: 'root' })
export class PlanetMapper {
  /**
   * Maps Planet DTO to Planet model.
   * @param dto Planet DTO.
   */
  public fromDto(dto: PlanetDto): Planet {
    return {
      id: dto.id,
      name: parseToNullish(dto.fields.name),
      diameter: parseToNullish(dto.fields.diameter, parseInt),
      rotationPeriod: parseToNullish(dto.fields.rotation_period, parseInt),
      orbitalPeriod: parseToNullish(dto.fields.orbital_period, parseInt),
      gravity: parseToNullish(dto.fields.gravity),
      population: parseToNullish(dto.fields.population, parseInt),
      climate: parseToNullish(dto.fields.climate),
      surfaceWater: parseToNullish(dto.fields.surface_water),
      terrain: parseToNullish(dto.fields.terrain, splitByComma),
    };
  }

  /**
   * Maps Planet model to Planet dto.
   * @param model Planet model.
   */
  public toDto(model: Planet): PlanetDto {
    return {
      id: model.id,
      fields: {
        name: parseFromNullish(model.name),
        diameter: parseFromNullish(model.diameter, String),
        rotation_period: parseFromNullish(model.rotationPeriod, String),
        orbital_period: parseFromNullish(model.orbitalPeriod, String),
        gravity: parseFromNullish(model.gravity),
        population: parseFromNullish(model.population, String),
        climate: parseFromNullish(model.climate),
        surface_water: parseFromNullish(model.surfaceWater),
        terrain: parseFromNullish(model.terrain, arr => arr.join(',')),
      },
    };
  }
}
