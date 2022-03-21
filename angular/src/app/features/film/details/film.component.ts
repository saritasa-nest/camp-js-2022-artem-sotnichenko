import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap, take, takeUntil } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { CharacterService } from 'src/app/core/services/character.service';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { FilmService } from 'src/app/core/services/film.service';
import { PlanetService } from 'src/app/core/services/planet.service';
import { assertNotNullish } from 'src/app/core/utils/assert-not-null';

import { DeleteDialogComponent, DeleteDialogData, DeleteDialogResult } from '../delete-dialog/delete-dialog.component';

/** Film component. */
@Component({
  selector: 'sw-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class FilmComponent {
  /** Film. */
  public readonly film$: Observable<Film>;

  /** Character names. */
  public readonly characterNames$: Observable<readonly string[]>;

  /** Planet names. */
  public readonly planetNames$: Observable<readonly string[]>;

  public constructor(
    route: ActivatedRoute,
    characterService: CharacterService,
    planetService: PlanetService,
    private readonly filmService: FilmService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    @Self() private readonly destroy$: DestroyService,
  ) {
    this.film$ = route.paramMap.pipe(
      switchMap(paramMap => {
        const id = paramMap.get('id');
        assertNotNullish(id, 'There is no film id. This is probably route issue.');
        return this.filmService.getFilm(id);
      }),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );

    this.characterNames$ = this.film$.pipe(
      switchMap(film => characterService.getCharacters(film.characterIds)
        .pipe(map(characters => characters.map(character => character.name)))),
    );

    this.planetNames$ = this.film$.pipe(
      switchMap(film => planetService.getPlanets(film.planetIds)
        .pipe(map(planets => planets.map(planet => planet.name)))),
    );
  }

  /** Handle delete. */
  public onDelete(): void {
    this.film$.pipe(
      switchMap(film => {
        const dialogRef = this.dialog.open<DeleteDialogComponent, DeleteDialogData, DeleteDialogResult>(
          DeleteDialogComponent,
          { data: { filmName: film.title } },
        );

        return dialogRef.afterClosed().pipe(
          filter(canDelete => canDelete === true),
          switchMap(() => this.filmService.delete(film.id)),
        );
      }),
      take(1),
      takeUntil(this.destroy$),
    ).subscribe({
      next: () => this.router.navigate(['/']),
    });
  }
}
