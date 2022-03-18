import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, switchMap, take, takeUntil, tap } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { CharacterService } from 'src/app/core/services/character.service';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { FilmManagementService } from 'src/app/core/services/film-management.service';
import { PlanetService } from 'src/app/core/services/planet.service';

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
    private readonly filmManagementService: FilmManagementService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    @Self() private readonly destroy$: DestroyService,
  ) {
    this.film$ = filmManagementService.getFilmByParamMap(route.paramMap);

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
      takeUntil(this.destroy$),
      take(1),
      switchMap(film => {
        const dialogRef = this.dialog.open<DeleteDialogComponent, DeleteDialogData, DeleteDialogResult>(
          DeleteDialogComponent,
          { data: { filmName: film.title } },
        );

        return dialogRef.afterClosed().pipe(
          filter(canDelete => canDelete === true),
          switchMap(() => this.filmManagementService.delete(film.id)),
          tap(() => {
            this.router.navigate(['/']);
          }),
        );
      }),
    ).subscribe();
  }
}
