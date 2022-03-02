import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Film } from 'src/app/core/models/film';
import { FilmService } from 'src/app/core/services/film/film.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

/** Films table component. */
@Component({
  selector: 'sw-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('show', [
      state('void', style({
        opacity: 0,
      })),
      state('visible', style({
        opacity: 1,
      })),
      transition('void => visible', [animate('0.5s ease-in')]),
    ]),
  ],
})
export class FilmsComponent {
  /** Films. */
  public readonly films$ = this.filmService.films$;

  public constructor(
    private readonly filmService: FilmService,
  ) {}

  /**
   * Film track function for ngFor.
   * @param index Index in array.
   * @param film Film.
   */
  public trackFilm(index: number, film: Film): Film['id'] {
    return film.id;
  }
}
