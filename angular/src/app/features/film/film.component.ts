import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { FilmDetailsService } from 'src/app/core/services/film-details.service';
import { Nullish } from 'src/app/core/utils/parse-nullish';

/** Film component. */
@Component({
  selector: 'sw-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmComponent {
  /** Film. */
  public film$: Observable<Film | null> = this.getFilm();

  /** Character names. */
  public characterNames$: Observable<readonly string[] | null>;

  /** Planet names. */
  public planetNames$: Observable<readonly (string | Nullish)[] | null>;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly filmDetailsService: FilmDetailsService,
  ) {
    this.characterNames$ = this.film$.pipe(
      switchMap(film => this.filmDetailsService.getCharacterNames(film?.characterIds ?? [])),
    );

    this.planetNames$ = this.film$.pipe(
      switchMap(film => this.filmDetailsService.getPlanetNames(film?.planetIds ?? [])),
    );
  }

  private getFilm(): Observable<Film | null> {
    return this.route.paramMap
      .pipe(
        switchMap(paramMap => {
          const id = paramMap.get('id');
          return id !== null ? this.filmDetailsService.getFilm(id) : of(null);
        }),
      );
  }
}
