import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, shareReplay, map } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { CharacterService } from 'src/app/core/services/character.service';
import { FilmService } from 'src/app/core/services/film/film.service';
import { PlanetService } from 'src/app/core/services/planet.service';
import { assertNotNullish } from 'src/app/core/utils/assert-not-null';

/** Film component. */
@Component({
  selector: 'sw-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmComponent {
  /** Film. */
  public readonly film$: Observable<Film>;

  /** Character names. */
  public readonly characterNames$: Observable<readonly string[]>;

  /** Planet names. */
  public readonly planetNames$: Observable<readonly string[]>;

  public constructor(
    route: ActivatedRoute,
    filmService: FilmService,
    characterService: CharacterService,
    planetService: PlanetService,
  ) {
    this.film$ = route.paramMap.pipe(
      switchMap(paramMap => {
        const id = paramMap.get('id');
        assertNotNullish(id, 'There is no film id. This is probably route issue.');
        return filmService.getFilm(id);
      }),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );

    this.characterNames$ = this.film$.pipe(
      switchMap(film => characterService.getCharacters(film.characterIds)
        .pipe(map(characters => characters.map(character => character.name)))),
    );

    this.planetNames$ = this.film$.pipe(
      switchMap(film => planetService.getPlanets(film.planetIds)
        .pipe(map(planets => planets.map(planet => planet.name)))),
    );
  }
}
