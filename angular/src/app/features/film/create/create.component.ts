import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from 'src/app/core/models/character';
import { FilmForm } from 'src/app/core/models/film-form';
import { Planet } from 'src/app/core/models/planet';
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
  public readonly planets$: Observable<readonly Planet[]>;

  /** All characters. */
  public readonly characters$: Observable<readonly Character[]>;

  public constructor(
    characterService: CharacterService,
    planetService: PlanetService,
    private readonly filmManagementService: FilmManagementService,
  ) {
    this.planets$ = planetService.getAllPlanets();
    this.characters$ = characterService.getAllCharacters();
  }

  /**
   * Handle submit.
   * @param filmForm Film.
   */
  public onSubmit(filmForm: FilmForm): void {
    this.filmManagementService.create(filmForm);
  }
}
