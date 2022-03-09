import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

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

  /** Get all planets. */
  public getAllPlanets(): Observable<Planet[]> {
    return this.firestoreService.fetchMany<PlanetDto>('planets').pipe(
      map(planetDtos => planetDtos.map(this.planetMapper.fromDto)),
    );
  }

  /** Get all characters. */
  public getAllCharacters(): Observable<Character[]> {
    return this.firestoreService.fetchMany<CharacterDto>('characters').pipe(
      map(characterDtos => characterDtos.map(this.characterMapper.fromDto)),
    );
  }
}
