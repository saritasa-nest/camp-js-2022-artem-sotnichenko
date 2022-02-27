import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Film } from 'src/app/core/models/film';
import { FilmService } from 'src/app/core/services/film/film.service';

/** Films table component. */
@Component({
  selector: 'sw-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsComponent {
  /** Films. */
  public readonly films$ = this.filmService.films$;

  public constructor(
    private readonly filmService: FilmService,
  ) {}

  /**
   * Film track function for ngFor.
   * @param _index Index in array.
   * @param film Film.
   */
  public trackFilm(_index: number, film: Film): string | undefined {
    return film ? film.id : undefined;
  }
}
