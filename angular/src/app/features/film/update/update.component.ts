import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take, takeUntil, tap } from 'rxjs';
import { Character } from 'src/app/core/models/character';
import { Film } from 'src/app/core/models/film';
import { FilmForm } from 'src/app/core/models/film-form';
import { Planet } from 'src/app/core/models/planet';
import { CharacterService } from 'src/app/core/services/character.service';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { FilmManagementService } from 'src/app/core/services/film-management.service';
import { PlanetService } from 'src/app/core/services/planet.service';

/** Film update component. */
@Component({
  selector: 'sw-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class UpdateComponent {
  /** Film. */
  public readonly film$: Observable<Film>;

  /** All planets. */
  public readonly planets$: Observable<readonly Planet[]>;

  /** All characters. */
  public readonly characters$: Observable<readonly Character[]>;

  public constructor(
    @Self() private readonly destroy$: DestroyService,
    private readonly location: Location,
    private readonly filmManagementService: FilmManagementService,
    route: ActivatedRoute,
    characterService: CharacterService,
    planetService: PlanetService,
  ) {
    this.film$ = filmManagementService.getFilmByParamMap(route.paramMap);
    this.characters$ = characterService.getAllCharacters();
    this.planets$ = planetService.getAllPlanets();
  }

  /**
   * Handle submit.
   * @param filmForm Film.
   */
  public onSubmit(filmForm: FilmForm): void {
    this.film$.pipe(
      takeUntil(this.destroy$),
      take(1),
      tap(film => {
        this.filmManagementService.update(film.id, filmForm);
      }),
    ).subscribe();
  }

  /**
   * Handle cancel.
   */
  public onCancel(): void {
    this.location.back();
  }
}
