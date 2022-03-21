import { formatDate } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Self } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, ReplaySubject, takeUntil, tap } from 'rxjs';
import { Character } from 'src/app/core/models/character';
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
  public submitButtonText = 'Submit';

  /** Whether is submit button visible. */
  @Input()
  public isSubmitButtonVisible = true;

  /** Cancel button text. */
  @Input()
  public cancelButtonText = 'Cancel';

  /** Whether is cancel button visible. */
  @Input()
  public isCancelButtonVisible = true;

  /**
   * Film.
   * Transforming film from prop into stream, so data that depends on film properly updating.
   */
  @Input()
  public set film(film: FilmForm | null) {
    if (film != null) {
      this.film$.next(film);
    }
  }

  /** All planets, used in autocomplete of entities select. */
  @Input()
  public allPlanets: readonly Planet[] = [];

  /** All characters, used in autocomplete of entities select. */
  @Input()
  public allCharacters: readonly Character[] = [];

  /** Submit event handler. */
  @Output()
  public readonly filmSubmit = new EventEmitter<FilmForm>();

  /** Cancel event handler. */
  @Output()
  public readonly filmCancel = new EventEmitter<void>();

  /** Film. */
  public readonly film$ = new ReplaySubject<FilmForm>();

  /** Selected planet ids. */
  public readonly selectedPlanetIds$ = this.film$.pipe(map(film => film.planetIds));

  /** Selected character ids. */
  public readonly selectedCharacterIds$ = this.film$.pipe(map(film => film.characterIds));

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
      producers: [film?.producers.join(',') ?? '', [Validators.required]],
      characterIds: [film?.characterIds ?? []],
      planetIds: [film?.planetIds ?? []],
    });
  }

  /** Handle form submit. */
  public onFilmSubmit(): void {
    if (this.filmForm.valid) {
      const film = this.filmForm?.value;
      if (film != null) {
        this.filmSubmit.emit({
          title: film.title.trim(),
          openingCrawl: film.openingCrawl.trim(),
          releaseDate: new Date(film.releaseDate),
          director: film.director.trim(),
          producers: film.producers.split(','),
          characterIds: film.characterIds,
          planetIds: film.planetIds,
        } as FilmForm);
      }
    }
  }

  /** Handle cancel. */
  public onCancel(): void {
    this.filmCancel.emit();
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
