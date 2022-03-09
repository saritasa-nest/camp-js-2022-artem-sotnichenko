import { Injectable } from '@angular/core';

import { Character } from '../../models/character';
import { parseFromNullish, parseToNullish } from '../../utils/parse-nullish';
import { splitByComma } from '../../utils/split-by-comma';

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
      birthYear: dto.fields.birth_year,
      eyeColors: splitByComma(dto.fields.eye_color),
      gender: parseToNullish(dto.fields.gender),
      hairColors: splitByComma(dto.fields.hair_color),
      height: parseToNullish(dto.fields.height, parseInt),
      mass: parseToNullish(dto.fields.mass, parseInt),
      skinColors: splitByComma(dto.fields.skin_color),
      homeworldId: dto.fields.homeworld,
    };
  }

  /**
   * Maps Character model to Character dto.
   * @param model Character model.
   */
  public toDto(model: Character): CharacterDto {
    return {
      id: model.id,
      fields: {
        name: model.name,
        birth_year: model.birthYear,
        eye_color: model.eyeColors.join(','),
        gender: parseFromNullish(model.gender),
        hair_color: model.hairColors.join(','),
        height: parseFromNullish(model.height, String),
        mass: parseFromNullish(model.mass, String),
        skin_color: model.skinColors.join(','),
        homeworld: model.homeworldId,
      },
    };
  }
}