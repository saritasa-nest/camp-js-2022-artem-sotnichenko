import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FilmForm } from 'src/app/core/models/film-form';
import { CharacterService } from 'src/app/core/services/character.service';
import { FilmManagementService } from 'src/app/core/services/film-management.service';
import { PlanetService } from 'src/app/core/services/planet.service';

/** Film create component. */
@Component({
  selector: 'sw-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {

  /** All planets. */
  public readonly planets$ = this.planetService.getAllPlanets();

  /** Selected planets. */
  public readonly selectedPlanetIds = [];

  /** All characters. */
  public readonly characters$ = this.characterService.getAllCharacters();

  /** Selected characters. */
  public readonly selectedCharacterIds = [];

  public constructor(
    private readonly characterService: CharacterService,
    private readonly planetService: PlanetService,
    private readonly filmManagementService: FilmManagementService,
  ) { }

  /**
   * Handle submit.
   * @param filmForm Film.
   */
  public onSubmit(filmForm: FilmForm): void {
    this.filmManagementService.create(filmForm);
  }
}
