import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Character } from '../models/character';

import { FirestoreService } from './firestore/firestore.service';
import { CharacterDto } from './mappers/dto/character.dto';
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
   * Get characters by ids array.
   * @param ids Character ids.
   */
  public getCharacters(ids: readonly Character['id'][]): Observable<Character[]> {
    return this.firestoreService
      .getManyByIds<CharacterDto>('characters', ids)
      .pipe(map(dtos => dtos.map(dto => this.characterMapper.fromDto(dto))));
  }

  /** Get all characters. */
  public getAllCharacters(): Observable<Character[]> {
    return this.firestoreService.getMany<CharacterDto>('characters').pipe(
      map(characterDtos => characterDtos.map(this.characterMapper.fromDto)),
    );
  }
}
