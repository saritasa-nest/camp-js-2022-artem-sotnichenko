import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Character } from '../models/character/character';

import { FirestoreService } from './firestore/firestore.service';
import { CharacterDto } from './mappers/dto/character/character.dto';
import { CharacterMapper } from './mappers/character.mapper';

/** Character service. */
@Injectable({
  providedIn: 'root',
})
export class CharacterService {

  public constructor(
    private readonly firestoreService: FirestoreService,
    private readonly characterMapper: CharacterMapper,
  ) { }

  /**
   * Get character names by ids array.
   * @param ids Character ids.
   */
  public getCharacterNames(ids: readonly Character['id'][]): Observable<Character['name'][]> {
    return this.getCharacters(ids).pipe(map(characters => characters.map(character => character.name)));
  }

  /**
   * Get characters by ids array.
   * @param ids Character ids.
   */
  public getCharacters(ids: readonly Character['id'][]): Observable<Character[]> {
    return this.firestoreService
      .fetchManyByIds<CharacterDto>('characters', ids)
      .pipe(map(dtos => dtos.map(dto => this.characterMapper.fromDto(dto))));
  }
}
