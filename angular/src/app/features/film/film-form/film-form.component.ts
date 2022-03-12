import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Character } from 'src/app/core/models/character';
import { Film } from 'src/app/core/models/film';
import { Planet } from 'src/app/core/models/planet';

/** Film form. */
@Component({
  selector: 'sw-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmFormComponent {
  /** Film. */
  @Input()
  public film?: Film;

  /** Selected planet ids. */
  @Input()
  public selectedPlanetIds: Planet['id'][] = [];

  /** Selected planets. */
  @Input()
  public allPlanets: readonly Planet[] = [];

  /** Selected character ids. */
  @Input()
  public selectedCharacterIds: Character['id'][] = [];

  /** All characters. */
  @Input()
  public allCharacters: readonly Character[] = [];

  /** Submitted event. */
  @Output()
  public submitted = new EventEmitter<Film>();

  /** Filters form. */
  public readonly filmForm = this.fb.group({
    title: ['', [Validators.required]],
    openingCrawl: ['', [Validators.required]],
    releaseDate: ['', [Validators.required]],
    director: ['', [Validators.required]],
    producers: ['', [Validators.required]],
    characterIds: [[]],
    planetIds: [[]],
  });

  public constructor(
    private readonly fb: FormBuilder,
  ) {}

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
          producers: film.producers.split(','),
          characterIds: film.characterIds,
          planetIds: film.planetIds,
        } as Film);
      }
    }
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
