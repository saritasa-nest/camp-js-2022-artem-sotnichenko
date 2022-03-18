import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, shareReplay, switchMap, take, takeUntil, tap } from 'rxjs';
import { Character } from 'src/app/core/models/character';
import { Film } from 'src/app/core/models/film';
import { FilmForm } from 'src/app/core/models/film-form';
import { Planet } from 'src/app/core/models/planet';
import { CharacterService } from 'src/app/core/services/character.service';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { FilmService } from 'src/app/core/services/film.service';
import { PlanetService } from 'src/app/core/services/planet.service';
import { assertNotNullish } from 'src/app/core/utils/assert-not-null';

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
    private readonly filmService: FilmService,
    route: ActivatedRoute,
    characterService: CharacterService,
    planetService: PlanetService,
  ) {
    this.film$ = route.paramMap.pipe(
      switchMap(paramMap => {
        const id = paramMap.get('id');
        assertNotNullish(id, 'There is no film id. This is probably route issue.');
        return this.filmService.getFilm(id);
      }),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
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
        this.filmService.update(film.id, filmForm);
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
