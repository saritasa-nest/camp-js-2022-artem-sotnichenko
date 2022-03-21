import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, takeUntil, tap } from 'rxjs';
import { Character } from 'src/app/core/models/character';
import { FilmForm } from 'src/app/core/models/film-form';
import { Planet } from 'src/app/core/models/planet';
import { CharacterService } from 'src/app/core/services/character.service';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { FilmService } from 'src/app/core/services/film.service';
import { PlanetService } from 'src/app/core/services/planet.service';

/** Film create component. */
@Component({
  selector: 'sw-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class CreateComponent {

  /** All planets. */
  public readonly planets$: Observable<readonly Planet[]>;

  /** All characters. */
  public readonly characters$: Observable<readonly Character[]>;

  public constructor(
    characterService: CharacterService,
    planetService: PlanetService,
    private readonly filmService: FilmService,
    @Self() private readonly destroy$: DestroyService,
    private readonly router: Router,
  ) {
    this.planets$ = planetService.getAllPlanets();
    this.characters$ = characterService.getAllCharacters();
  }

  /**
   * Handle submit.
   * @param filmForm Film.
   */
  public onSubmit(filmForm: FilmForm): void {
    /*
     * Getting "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?" warning,
     * when adding pipe directly to create return.
     * Decided to use a variable to explicitly subscribe in angular zone.
     */
    const newFilm$ = this.filmService.create(filmForm);
    newFilm$.pipe(
      takeUntil(this.destroy$),
      take(1),
    ).subscribe({
      next: film => this.router.navigate(['/', 'film', film.id]),
    });
  }
}
