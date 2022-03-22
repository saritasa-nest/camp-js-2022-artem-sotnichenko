import { Component, ChangeDetectionStrategy, Self, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs';
import { FilmForm } from 'src/app/core/models/film-form';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { FilmService } from 'src/app/core/services/film.service';

/** Film create component. */
@Component({
  selector: 'sw-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class CreateComponent {

  public constructor(
    private readonly filmService: FilmService,
    @Self() private readonly destroy$: DestroyService,
    private readonly router: Router,
    private readonly ngZone: NgZone,
  ) {}

  /**
   * Handle submit.
   * @param filmForm Film.
   */
  public onSubmit(filmForm: FilmForm): void {
    /*
     * Getting "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?" warning,
     * when adding pipe directly to create return.
     */
    this.filmService.create(filmForm).pipe(
      takeUntil(this.destroy$),
      take(1),
    )
      .subscribe({
        next: film => this.ngZone.run(() => this.router.navigate(['/film', film.id])),
      });
  }
}
