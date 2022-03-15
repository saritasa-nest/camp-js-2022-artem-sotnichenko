import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { CharacterService } from 'src/app/core/services/character.service';
import { FilmManagementService } from 'src/app/core/services/film-management.service';
import { PlanetService } from 'src/app/core/services/planet.service';

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
    filmManagementService: FilmManagementService,
    characterService: CharacterService,
    planetService: PlanetService,
  ) {
    this.film$ = filmManagementService.getFilm(route.paramMap);

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
