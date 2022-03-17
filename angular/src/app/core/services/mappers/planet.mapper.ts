import { Injectable } from '@angular/core';

import { Planet } from '../../models/planet';

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
      name: dto.fields.name,
    };
  }
}
