import { formatDate } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Self, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ignoreElements, map, merge, Observable, ReplaySubject, takeUntil, tap } from 'rxjs';
import { Character } from 'src/app/core/models/character';
import { FilmForm } from 'src/app/core/models/film-form';
import { Planet } from 'src/app/core/models/planet';
import { CharacterService } from 'src/app/core/services/character.service';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { PlanetService } from 'src/app/core/services/planet.service';
import { DATE_FORMAT, DATE_LOCALE } from 'src/app/core/utils/constants';

/** Film form. */
@Component({
  selector: 'sw-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class FilmFormComponent implements OnInit {
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
   */
  @Input()
  public set film(film: FilmForm | null) {
    // Transforming film from prop into stream, so data that depends on film properly updating.
    if (film != null) {
      this.film$.next(film);
    }
  }

  /** Submit event handler. */
  @Output()
  public readonly filmSubmit = new EventEmitter<FilmForm>();

  /** Cancel event handler. */
  @Output()
  public readonly filmCancel = new EventEmitter<void>();

  /** Film. */
  public readonly film$ = new ReplaySubject<FilmForm>(1);

  /** Selected planet ids. */
  public readonly selectedPlanetIds$ = this.film$.pipe(map(film => film.planetIds));

  /** Selected character ids. */
  public readonly selectedCharacterIds$ = this.film$.pipe(map(film => film.characterIds));

  /** Filters form. */
  public readonly filmForm = this.createFilmForm();

  /** All planets, used in autocomplete of entities select. */
  public readonly allPlanets$: Observable<readonly Planet[]>;

  /** All characters, used in autocomplete of entities select. */
  public readonly allCharacters$: Observable<readonly Character[]>;

  public constructor(
    @Self() private readonly destroy$: DestroyService,
    private readonly fb: FormBuilder,
    characterService: CharacterService,
    planetService: PlanetService,
  ) {
    this.allCharacters$ = characterService.getAllCharacters();
    this.allPlanets$ = planetService.getAllPlanets();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    const updateFilmFormOnPropChangeSideEffect$ = this.film$.pipe(
      tap(film => {
        this.updateFilmForm(film);
      }),
      takeUntil(this.destroy$),
    );

    merge(
      updateFilmFormOnPropChangeSideEffect$,
    ).pipe(
      ignoreElements(),
      takeUntil(this.destroy$),
    )
      .subscribe();
  }

  /**
   * Create film reactive form.
   */
  public createFilmForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required]],
      openingCrawl: ['', [Validators.required]],
      releaseDate: [formatDate(new Date(), DATE_FORMAT, DATE_LOCALE), [Validators.required]],
      director: ['', [Validators.required]],
      producers: ['', [Validators.required]],
      characterIds: [[]],
      planetIds: [[]],
    });
  }

  /**
   * Update film  form.
   * @param film Film.
   */
  public updateFilmForm(film: FilmForm): void {
    return this.filmForm.patchValue({
      title: film.title,
      openingCrawl: film.openingCrawl,
      releaseDate: formatDate(film.releaseDate, DATE_FORMAT, DATE_LOCALE),
      director: film.director,
      producers: film.producers,
      characterIds: film.characterIds,
      planetIds: film.planetIds,
    });
  }

  /** Handle form submit. */
  public onFilmSubmit(): void {
    if (this.filmForm.valid) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const film = this.filmForm.value;
      this.filmSubmit.emit({
        title: film.title.trim(),
        openingCrawl: film.openingCrawl.trim(),
        releaseDate: new Date(film.releaseDate),
        director: film.director.trim(),
        producers: typeof film.producers === 'string' ? film.producers.split(',') : film.producers,
        characterIds: film.characterIds,
        planetIds: film.planetIds,
      } as FilmForm);
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.filmForm.get('characterIds')!.setValue(ids);
  }

  /**
   * Handle selected Planet ids change.
   * @param ids Planets ids.
   */
  public onPlanetsChange(ids: readonly Planet['id'][]): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.filmForm.get('planetIds')!.setValue(ids);
  }
}
