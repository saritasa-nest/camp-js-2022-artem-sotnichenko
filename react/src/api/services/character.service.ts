import { Character } from 'src/models/character';
import { CharacterDto } from '../dtos/character.dto';
import { characterMapper } from '../mappers/character.mapper';
import { FirestoreService } from './firestore.service';

export namespace CharacterService {
  /**
   * Get characters by ids array.
   * @param ids Character ids.
   */
  export async function fetchCharactersByIds(ids: readonly Character['id'][]): Promise<Character[]> {
    const characterDtos = await FirestoreService.getManyByIds<CharacterDto>('characters', ids);
    return characterDtos.map(characterMapper.fromDto);
  }
}