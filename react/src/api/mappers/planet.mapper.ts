import { Planet } from 'src/models/planet';
import { PlanetDto } from '../dtos/planet.dto';

/**
 * Planet mapper.
 */
class PlanetMapper {
  /**
   * Maps planet DTO to planet model.
   * @param dto Planet DTO.
   */
  public fromDto(dto: PlanetDto): Planet {
    return new Planet({
      id: dto.id,
      name: dto.fields.name,
    });
  }
}

export const planetMapper = new PlanetMapper();
