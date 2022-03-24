import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Film } from '../models/film';
import { FilmForm } from '../models/film-form';

import { FilmsService } from './films/films.service';

import { FirestoreService } from './firestore/firestore.service';
import { FilmDto } from './mappers/dto/film.dto';
import { FilmFormMapper } from './mappers/film-form.mapper';
import { FilmMapper } from './mappers/film.mapper';

/** Film management. */
@Injectable({
  providedIn: 'root',
})
export class FilmService {

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly filmMapper: FilmMapper,
    private readonly filmFormMapper: FilmFormMapper,
    private readonly firestoreService: FirestoreService,
  ) { }

  /**
   * Get one film by id.
   * @param id Film id.
   */
  public getFilm(id: Film['id']): Observable<Film> {
    return this.firestoreService.getOneById<FilmDto>('films', id).pipe(
      map(this.filmMapper.fromDto),
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
   */
  public update(id: Film['id'], film: FilmForm): Observable<void> {
    return this.firestoreService
      .update('films', id, this.filmFormMapper.toDto(film));
  }

  /**
   * Delete film.
   * @param id Film id.
   */
  public delete(id: Film['id']): Observable<void> {
    return this.firestoreService.delete('films', id);
  }
}
