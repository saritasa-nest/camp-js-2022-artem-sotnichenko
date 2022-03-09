import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { FilmDetailsService } from 'src/app/core/services/film-details.service';

/** Film component. */
@Component({
  selector: 'sw-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class FilmComponent {
  /** Films. */
  public film$: Observable<Film | null> = this.getFilm();

  public constructor(
    @Self() private readonly destroy$: DestroyService,
    private readonly route: ActivatedRoute,
    private readonly filmDetailsService: FilmDetailsService,
  ) {}

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
