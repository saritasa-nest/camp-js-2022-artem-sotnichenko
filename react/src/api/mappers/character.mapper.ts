import { Character } from 'src/models/character';
import { CharacterDto } from '../dtos/character.dto';

/**
 * Character mapper.
 */
class CharacterMapper {
  /**
   * Maps character DTO to character model.
   * @param dto Character DTO.
   */
  public fromDto(dto: CharacterDto): Character {
    return new Character({
      id: dto.id,
      name: dto.fields.name,
    });
  }
}

export const characterMapper = new CharacterMapper();
