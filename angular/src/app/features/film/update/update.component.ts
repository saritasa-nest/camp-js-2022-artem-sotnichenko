import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, shareReplay, switchMap, take, takeUntil, tap } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { FilmForm } from 'src/app/core/models/film-form';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { FilmService } from 'src/app/core/services/film.service';
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

  public constructor(
    @Self() private readonly destroy$: DestroyService,
    private readonly router: Router,
    private readonly filmService: FilmService,
    route: ActivatedRoute,
  ) {
    this.film$ = route.paramMap.pipe(
      switchMap(paramMap => {
        const id = paramMap.get('id');
        assertNotNullish(id, 'There is no film id. This is probably route issue.');
        return this.filmService.getFilm(id);
      }),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /**
   * Handle submit.
   * @param filmForm Film.
   */
  public onSubmit(filmForm: FilmForm): void {
    this.film$.pipe(
      tap(film => {
        this.filmService.update(film.id, filmForm);
      }),
      take(1),
      takeUntil(this.destroy$),
    ).subscribe({
      next: film => this.router.navigate(['/film', film.id]),
    });
  }

  /**
   * Handle cancel.
   */
  public onCancel(): void {
    this.film$.pipe(
      take(1),
      takeUntil(this.destroy$),
    ).subscribe({
      next: film => this.router.navigate(['/film', film.id]),
    });
  }
}
