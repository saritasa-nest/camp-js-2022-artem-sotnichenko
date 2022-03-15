import { formatDate } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Self } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, ReplaySubject, takeUntil, tap } from 'rxjs';
import { Character } from 'src/app/core/models/character';
import { Film } from 'src/app/core/models/film';
import { FilmForm } from 'src/app/core/models/film-form';
import { Planet } from 'src/app/core/models/planet';
import { DestroyService } from 'src/app/core/services/destroy.service';

/** Film form. */
@Component({
  selector: 'sw-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class FilmFormComponent {
  /** Submit button text. */
  @Input()
  public submitText = 'Submit';

  /** Whether is submit button visible. */
  @Input()
  public isSubmitVisible = true;

  /** Cancel button text. */
  @Input()
  public cancelText = 'Cancel';

  /** Whether is cancel button visible. */
  @Input()
  public isCancelVisible = true;

  /** Film. */
  @Input()
  public set film(film: FilmForm | null) {
    if (film != null) {
      this.film$.next(film);
    }
  }

  /** Film. */
  public readonly film$ = new ReplaySubject<FilmForm>();

  // public film: Film | null = null;
  /** Selected planets. */
  @Input()
  public allPlanets: readonly Planet[] = [];

  /** All characters. */
  @Input()
  public allCharacters: readonly Character[] = [];

  /** Selected planet ids. */
  @Input()
  public selectedPlanetIds$ = this.film$.pipe(map(film => film.planetIds));

  /** Selected character ids. */
  @Input()
  public selectedCharacterIds$ = this.film$.pipe(map(film => film.characterIds));

  /** Submitted event. */
  @Output()
  public readonly submitted = new EventEmitter<FilmForm>();

  /** Canceled event. */
  @Output()
  public readonly canceled = new EventEmitter<void>();

  /** Filters form. */
  public filmForm: FormGroup = this.getFilmForm();

  public constructor(
    @Self() private readonly destroy$: DestroyService,
    private readonly fb: FormBuilder,
  ) {
    this.film$.pipe(
      tap(film => {
        this.filmForm = this.getFilmForm(film);
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  /**
   * Get film reactive form.
   * @param film Film.
   */
  public getFilmForm(film?: FilmForm): FormGroup {
    return this.fb.group({
      title: [film?.title ?? '', [Validators.required]],
      openingCrawl: [film?.openingCrawl ?? '', [Validators.required]],
      releaseDate: [formatDate(this.film?.releaseDate ?? new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      director: [film?.director ?? '', [Validators.required]],
      producers: [film?.producers ?? '', [Validators.required]],
      characterIds: [film?.characterIds ?? []],
      planetIds: [film?.planetIds ?? []],
    });
  }

  /** Handle form submit. */
  public onFilmSubmit(): void {
    if (this.filmForm.valid) {
      const film = this.filmForm?.value;
      if (film != null) {
        this.submitted.emit({
          title: film.title.trim(),
          openingCrawl: film.openingCrawl.trim(),
          releaseDate: new Date(film.releaseDate),
          director: film.director.trim(),
          producers: typeof film.producers === 'string' ? film.producers.split(',') : film.producers,
          characterIds: film.characterIds,
          planetIds: film.planetIds,
        } as Film);
      }
    }
  }

  /** Handle cancel. */
  public onCancel(): void {
    this.canceled.emit();
  }

  /**
   * Handle selected character ids change.
   * @param ids Characters ids.
   */
  public onCharactersChange(ids: readonly Character['id'][]): void {
    this.filmForm.get('characterIds')?.setValue(ids);
  }

  /**
   * Handle selected Planet ids change.
   * @param ids Planets ids.
   */
  public onPlanetsChange(ids: readonly Planet['id'][]): void {
    this.filmForm.get('planetIds')?.setValue(ids);
  }
}
