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
    const characterDtos = await FirestoreService.fetchManyByIds<CharacterDto>('characters', ids);
    return characterDtos.map(characterMapper.fromDto);
  }

  /**
   * Get all characters.
   */
  export async function fetchAllCharacters(): Promise<Character[]> {
    const characterDtos = await FirestoreService.fetchMany<CharacterDto>('characters');
    return characterDtos.map(characterMapper.fromDto);
  }
}
