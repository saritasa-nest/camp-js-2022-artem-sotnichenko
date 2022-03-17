import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, shareReplay } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { CharacterService } from 'src/app/core/services/character.service';
import { FilmService } from 'src/app/core/services/film/film.service';
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
  public readonly film$: Observable<Film> = this.getFilm();

  /** Character names. */
  public readonly characterNames$: Observable<readonly string[]>;

  /** Planet names. */
  public readonly planetNames$: Observable<readonly string[]>;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly filmService: FilmService,
    private readonly characterService: CharacterService,
    private readonly planetService: PlanetService,
  ) {
    this.characterNames$ = this.film$.pipe(
      switchMap(film => this.characterService.getCharacterNames(film.characterIds)),
    );

    this.planetNames$ = this.film$.pipe(
      switchMap(film => this.planetService.getPlanetNames(film.planetIds)),
    );
  }

  private getFilm(): Observable<Film> {
    return this.route.paramMap
      .pipe(
        switchMap(paramMap => this.filmService.getFilm(paramMap.get('id') as string)),
        shareReplay({ refCount: true, bufferSize: 1 }),
      );
  }
}
