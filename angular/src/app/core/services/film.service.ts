import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { map, Observable } from 'rxjs';

import { Film } from '../models/film';

import { getCollection } from '../utils/firebase/get-collection-typed';

import { FilmDto } from './mappers/dto/film';
import { FilmMapper } from './mappers/film.mapper';

/** Film service. */
@Injectable({
  providedIn: 'root',
})
export class FilmService {
  /** Films. */
  public readonly films$: Observable<Film[]>;

  public constructor(
    private readonly db: Firestore,
    private readonly filmMapper: FilmMapper,
  ) {
    this.films$ = collectionData<FilmDto>(getCollection(this.db, 'films'), { idField: 'id' }).pipe(
      map(films => films.map(this.filmMapper.fromDto)),
    );
  }
}
