import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Film } from '../models/film';

import { FirestoreService } from './firestore/firestore.service';
import { FilmMapper } from './mappers/film.mapper';

/** Film management. */
@Injectable({
  providedIn: 'root',
})
export class FilmManagementService {

  public constructor(
    private readonly filmMapper: FilmMapper,
    private readonly firestoreService: FirestoreService,
  ) { }

  /**
   * Create film.
   * @param film Film object.
   * @returns Film data that have been added into store.
   */
  public create(film: Film): Observable<Film> {
    return this.firestoreService
      .create('films', this.filmMapper.toDto(film))
      .pipe(map(dto => this.filmMapper.fromDto(dto)));
  }
}
