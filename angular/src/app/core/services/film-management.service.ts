import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';

import { Film } from '../models/film';
import { FilmForm } from '../models/film-form';
import { assertNotNullish } from '../utils/assert-not-null';

import { FilmService } from './film/film.service';

import { FirestoreService } from './firestore/firestore.service';
import { FilmDto } from './mappers/dto/film.dto';
import { FilmFormMapper } from './mappers/film-form.mapper';
import { FilmMapper } from './mappers/film.mapper';

/** Film management. */
@Injectable({
  providedIn: 'root',
})
export class FilmManagementService {

  public constructor(
    private readonly filmService: FilmService,
    private readonly filmMapper: FilmMapper,
    private readonly filmFormMapper: FilmFormMapper,
    private readonly firestoreService: FirestoreService,
  ) { }

  /**
   * Get film.
   * @param paramMap$ Route param map.
   */
  public getFilm(paramMap$: Observable<ParamMap>): Observable<Film> {
    return paramMap$.pipe(
      switchMap(paramMap => {
        const id = paramMap.get('id');
        assertNotNullish(id, 'There is no film id. This is probably route issue.');
        return this.filmService.getFilm(id);
      }),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /**
   * Create film.
   * @param film Film object.
   * @returns Film data that have been added into store.
   */
  public create(film: FilmForm): Observable<Film> {
    return this.firestoreService
      .create<FilmDto>('films', this.filmFormMapper.toDto(film))
      .pipe(map(dto => this.filmMapper.fromDto(dto)));
  }

  /**
   * Create film.
   * @param id Film id.
   * @param film Film object.
   * @returns Film data that have been added into store.
   */
  public update(id: Film['id'], film: FilmForm): Observable<void> {
    return this.firestoreService
      .update('films', id, this.filmFormMapper.toDto(film));
  }
}
