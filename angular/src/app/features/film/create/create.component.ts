import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Film } from 'src/app/core/models/film';
import { FilmDetailsService } from 'src/app/core/services/film-details.service';
import { FilmManagementService } from 'src/app/core/services/film-management.service';

/** Film create component. */
@Component({
  selector: 'sw-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {

  /** All planets. */
  public readonly planets$ = this.filmDetailsService.getAllPlanets();

  /** Selected planets. */
  public readonly selectedPlanetIds = [];

  /** All characters. */
  public readonly characters$ = this.filmDetailsService.getAllCharacters();

  /** Selected characters. */
  public readonly selectedCharacterIds = [];

  public constructor(
    private readonly filmDetailsService: FilmDetailsService,
    private readonly filmManagementService: FilmManagementService,
  ) { }

  /**
   * Handle submit.
   * @param film Film.
   */
  public onSubmit(film: Film): void {
    this.filmManagementService.create(film);
  }
}
