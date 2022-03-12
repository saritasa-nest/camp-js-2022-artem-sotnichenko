import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Character } from '../models/character';
import { Film } from '../models/film';
import { Planet } from '../models/planet';

import { FirestoreService } from './firestore/firestore.service';
import { CharacterMapper } from './mappers/character.mapper';
import { CharacterDto } from './mappers/dto/character.dto';
import { FilmDto } from './mappers/dto/film.dto';
import { PlanetDto } from './mappers/dto/planet.dto';
import { FilmMapper } from './mappers/film.mapper';
import { PlanetMapper } from './mappers/planet.mapper';

/** Film service. */
@Injectable({
  providedIn: 'root',
})
export class FilmDetailsService {

  public constructor(
    private readonly filmMapper: FilmMapper,
    private readonly planetMapper: PlanetMapper,
    private readonly characterMapper: CharacterMapper,
    private readonly firestoreService: FirestoreService,
  ) { }

  /**
   * Get one film by id.
   * @param id Film id.
   */
  public getFilm(id: FilmDto['id']): Observable<Film> {
    return this.firestoreService.fetchOne<FilmDto>('films', id).pipe(
      map(this.filmMapper.fromDto),
    );
  }

  /**
   * Get planet names by ids array.
   * @param ids Planet ids.
   */
  public getPlanetNames(ids: readonly Planet['id'][]): Observable<readonly Planet['name'][]> {
    return this.firestoreService
      .fetchManyByIds<PlanetDto>('planets', ids)
      .pipe(map(dtos => dtos.map(dto => this.planetMapper.fromDto(dto).name)));
  }

  /**
   * Get character names by ids array.
   * @param ids Character ids.
   */
  public getCharacterNames(ids: readonly Character['id'][]): Observable<readonly Character['name'][]> {
    return this.firestoreService
      .fetchManyByIds<CharacterDto>('characters', ids)
      .pipe(map(dtos => dtos.map(dto => this.characterMapper.fromDto(dto).name)));
  }
}
