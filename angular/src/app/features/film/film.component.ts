import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, shareReplay, map } from 'rxjs';
import { Character } from 'src/app/core/models/character';
import { Film } from 'src/app/core/models/film';
import { Planet } from 'src/app/core/models/planet';
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
  public readonly film$: Observable<Film> = this.getFilm();

  /** Character names. */
  public readonly characterNames$: Observable<readonly string[]> = this.getCharacterNames();

  /** Planet names. */
  public readonly planetNames$: Observable<readonly string[]> = this.getPlanetNames();

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly filmService: FilmService,
    private readonly characterService: CharacterService,
    private readonly planetService: PlanetService,
  ) {}

  private getFilm(): Observable<Film> {
    return this.route.paramMap
      .pipe(
        switchMap(paramMap => {
          const id = paramMap.get('id');
          assertNotNullish(id, 'There is no film id. This is probably route issue.');
          return this.filmService.getFilm(id);
       }),
        shareReplay({ refCount: true, bufferSize: 1 }),
      );
  }

  /**
   * Get character names by ids array.
   */
  private getCharacterNames(): Observable<Character['name'][]> {
    return this.film$.pipe(
      switchMap(film => this.characterService.getCharacters(film.characterIds)
        .pipe(map(characters => characters.map(character => character.name)))),
    );
  }

  /**
   * Get Planet names by ids array.
   */
  private getPlanetNames(): Observable<Planet['name'][]> {
    return this.film$.pipe(
      switchMap(film => this.planetService.getPlanets(film.planetIds)
        .pipe(map(planets => planets.map(planet => planet.name)))),
    );
  }
}
