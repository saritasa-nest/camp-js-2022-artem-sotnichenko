import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { FilmDetailsService } from 'src/app/core/services/film-details.service';

/** Film component. */
@Component({
  selector: 'sw-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmComponent {
  /** Film. */
  public readonly film$: Observable<Film | null> = this.getFilm();

  /** Character names. */
  public readonly characterNames$: Observable<readonly string[] | null>;

  /** Planet names. */
  public readonly planetNames$: Observable<readonly string[] | null>;

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
