import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, takeUntil, tap } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { FilmForm } from 'src/app/core/models/film-form';
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
  public readonly film$: Observable<Film> = this.filmManagementService.getFilm(this.route.paramMap);

  /** All planets. */
  public readonly planets$ = this.planetService.getAllPlanets();

  /** All characters. */
  public readonly characters$ = this.characterService.getAllCharacters();

  /** Film id. */
  public filmId: Film['id'] | null = null;

  public constructor(
    @Self() private readonly destroy$: DestroyService,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly filmManagementService: FilmManagementService,
    private readonly characterService: CharacterService,
    private readonly planetService: PlanetService,
  ) {
    this.film$.pipe(
      tap(film => {
        this.filmId = film.id;
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  /**
   * Handle submit.
   * @param film Film.
   */
  public onSubmit(film: FilmForm): void {
    if (this.filmId) {
      this.filmManagementService.update(this.filmId, film);
    }
  }

  /**
   * Handle cancel.
   */
  public onCancel(): void {
    this.location.back();
  }
}
