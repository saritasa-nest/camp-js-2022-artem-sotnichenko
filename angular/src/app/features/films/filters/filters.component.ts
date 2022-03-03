import { Component, OnInit, ChangeDetectionStrategy, Self } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { FilmService } from 'src/app/core/services/film/film.service';
import { PaginationDirection, SortField, SortDirection, FilterOptions } from 'src/app/core/services/film/utils/types';

export const TO_READABLE_SORT_FIELD_MAP: Readonly<Record<SortField, string>> = {
  [SortField.Title]: 'Title',
  [SortField.Producers]: 'Producers',
  [SortField.Director]: 'Director',
  [SortField.ReleaseDate]: 'Release date',
};

export const TO_READABLE_SORT_DIRECTION_MAP: Readonly<Record<SortDirection, string>> = {
  [SortDirection.Ascending]: 'Ascending',
  [SortDirection.Descending]: 'Descending',
};

const INITIAL_SEARCH_TEXT = '';
const INITIAL_SORT_FIELD = SortField.Title;
const INITIAL_SORT_DIRECTION = SortDirection.Ascending;

/** Films filters. */
@Component({
  selector: 'sw-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class FiltersComponent implements OnInit {
  /** Sort field select options. */
  public readonly sortFieldOptions = (Object.entries(TO_READABLE_SORT_FIELD_MAP)).map(([value, text]) => ({
    value, text,
  }));

  /** Sort direction select options. */
  public readonly sortDirectionOptions = (Object.entries(TO_READABLE_SORT_DIRECTION_MAP)).map(([value, text]) => ({
    value, text,
  }));

  /** Filters form. */
  public readonly filtersForm = this.fb.group({
    searchText: this.fb.control(INITIAL_SEARCH_TEXT),
    sortOptions: this.fb.group({
      field: this.fb.control(INITIAL_SORT_FIELD),
      direction: this.fb.control(INITIAL_SORT_DIRECTION),
    }),
  });

  /** Whether it is first page, used for button disabling. */
  public readonly isFirstPage$ = this.filmService.isFirstPage$;

  /** Whether it is last page, used for button disabling. */
  public readonly isLastPage$ = this.filmService.isLastPage$;

  public constructor(
    @Self() private readonly destroy$: DestroyService,
    private readonly fb: FormBuilder,
    private readonly filmService: FilmService,
  ) {}

  /** @inheritdoc */
  public ngOnInit(): void {
    this.filtersForm.get('searchText')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        tap(searchText => {
          if (searchText !== '') {
            this.filtersForm.get('sortOptions')?.disable();
          } else {
            this.filtersForm.get('sortOptions')?.enable();
          }
        }),
      )
      .subscribe();

    this.filtersForm.get('sortOptions')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        tap(sortOptions => {
          if (sortOptions.field !== INITIAL_SORT_FIELD || sortOptions.direction !== INITIAL_SORT_DIRECTION) {
            this.filtersForm.get('searchText')?.disable();
          } else {
            this.filtersForm.get('searchText')?.enable();
          }
        }),
      )
      .subscribe();
  }

  /** Handle filters apply. */
  public onFiltersApply(): void {
    const { searchText, sortOptions } = this.filtersForm.value as FilterOptions;
    if (searchText !== '' && searchText != null) {
      return this.filmService.setSearchText(searchText);
    }
    return this.filmService.setSortOptions(sortOptions);
  }

  /**
   * Handle filters reset.
   * @param event Event.
   */
  public onFiltersReset(event: Event): void {
    event.preventDefault();
    this.filtersForm.reset({
      searchText: INITIAL_SEARCH_TEXT,
      sortOptions: {
        field: INITIAL_SORT_FIELD,
        direction: INITIAL_SORT_DIRECTION,
      },
    });
  }

  /** Handle next page button click. */
  public onNextPage(): void {
    this.filmService.changePage(PaginationDirection.Next);
  }

  /** Handle previous page button click. */
  public onPrevPage(): void {
    this.filmService.changePage(PaginationDirection.Prev);
  }
}
