import { Injectable } from '@angular/core';

import { Character } from '../../models/character';

import { CharacterDto } from './dto/character.dto';

/**
 * Mapper for user entities.
 */
@Injectable({ providedIn: 'root' })
export class CharacterMapper {
  /**
   * Maps Character DTO to Character model.
   * @param dto Character DTO.
   */
  public fromDto(dto: CharacterDto): Character {
    return {
      id: dto.id,
      name: dto.fields.name,
    };
  }
}
