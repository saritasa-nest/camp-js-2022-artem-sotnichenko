import { Component, OnInit, ChangeDetectionStrategy, Self } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { FilmService } from 'src/app/core/services/film/film.service';
import { PaginationDirection, SortField, SortOptions, SortDirection } from 'src/app/core/services/film/utils/types';

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
const INITIAL_PAGE = PaginationDirection.Next;

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
  public sortFiledOptions = (Object.entries(TO_READABLE_SORT_FIELD_MAP)).map(([value, text]) => ({
    value, text,
  }));

  /** Sort direction select options. */
  public sortDirectionOptions = (Object.entries(TO_READABLE_SORT_DIRECTION_MAP)).map(([value, text]) => ({
    value, text,
  }));

  /** Filters form. */
  public filtersForm = this.fb.group({
    searchText: this.fb.control(INITIAL_SEARCH_TEXT),
    sort: this.fb.group({
      field: this.fb.control(INITIAL_SORT_FIELD),
      direction: this.fb.control(INITIAL_SORT_DIRECTION),
    }),
    page: this.fb.control(INITIAL_PAGE),
  });

  /** Whether it is first page, used for button disabling. */
  public isFirstPage$ = this.filmService.isFirstPage$;

  /** Whether it is last page, used for button disabling. */
  public isLastPage$ = this.filmService.isLastPage$;

  public constructor(
    @Self() private readonly destroy$: DestroyService,
    private readonly fb: FormBuilder,
    private readonly filmService: FilmService,
  ) {}

  /** @inheritdoc */
  public ngOnInit(): void {
    const searchTextControl = this.filtersForm.get('searchText');
    searchTextControl?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((text: string) => {
        if (searchTextControl.pristine) {
          return;
        }

        this.resetSortOptions();
        this.filmService.setSearchText(text);
      });

    const sortControl = this.filtersForm.get('sort');
    sortControl?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((sortOptions: SortOptions) => {
        if (sortControl.pristine) {
          return;
        }

        this.resetSearchText();
        this.filmService.setSortOptions(sortOptions);
      });
  }

  private resetSearchText(): void {
    const searchControl = this.filtersForm.get('searchText');
    searchControl?.reset();
    searchControl?.markAsPristine();
    searchControl?.markAsUntouched();
  }

  private resetSortOptions(): void {
    const sortControl = this.filtersForm.get('sort');
    sortControl?.reset({
      field: INITIAL_SORT_FIELD,
      direction: INITIAL_SORT_DIRECTION,
    });
    sortControl?.markAsPristine();
    sortControl?.markAsUntouched();
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
