import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FilmService } from 'src/app/core/services/film.service';

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
  ) {
    // this.filmService.films$.subscribe(films => console.log(films));
  }
}
