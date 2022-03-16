import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, shareReplay, map, filter } from 'rxjs';
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
  public readonly characterNames$: Observable<readonly string[] | null>;

  /** Planet names. */
  public readonly planetNames$: Observable<readonly string[] | null>;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly filmService: FilmService,
    private readonly characterService: CharacterService,
    private readonly planetService: PlanetService,
  ) {
    this.characterNames$ = this.film$.pipe(
      switchMap(film => this.characterService.getCharacterNames(film?.characterIds ?? [])),
    );

    this.planetNames$ = this.film$.pipe(
      switchMap(film => this.planetService.getPlanetNames(film?.planetIds ?? [])),
    );
  }

  private getFilm(): Observable<Film> {
    return this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('id')),
        filter((id): id is string => id != null),
        switchMap(id => this.filmService.getFilm(id)),
        shareReplay({ refCount: true, bufferSize: 1 }),
      );
  }
}
