import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilmService } from 'src/app/core/services/film/film.service';
import { PaginationDirection, SortField, SortOptions, SortOrder } from 'src/app/core/services/film/utils/types';

export const TO_READABLE_SORT_FIELD_MAP: Readonly<Record<SortField, string>> = {
  [SortField.Title]: 'Title',
  [SortField.Producers]: 'Producers',
  [SortField.Director]: 'Director',
  [SortField.ReleaseDate]: 'Release date',
};

export const TO_READABLE_SORT_ORDER_MAP: Readonly<Record<SortOrder, string>> = {
  [SortOrder.Ascending]: 'Ascending',
  [SortOrder.Descending]: 'Descending',
};

const INITIAL_SORT_FIELD = SortField.Title;
const INITIAL_SORT_ORDER = SortOrder.Ascending;
const INITIAL_PAGE = PaginationDirection.Next;

/** Films filters. */
@Component({
  selector: 'sw-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  /** Sort field select options. */
  public sortFileds = (Object.values(SortField) as SortField[]).map(field => ({
    value: field,
    text: TO_READABLE_SORT_FIELD_MAP[field],
  }));

  /** Sort order select options. */
  public sortOrders = (Object.values(SortOrder) as SortOrder[]).map(order => ({
    value: order,
    text: TO_READABLE_SORT_ORDER_MAP[order],
  }));

  /** Filters form. */
  public filtersForm = this.fb.group({
    searchText: this.fb.control(''),
    sort: this.fb.group({
      field: this.fb.control(INITIAL_SORT_FIELD),
      order: this.fb.control(INITIAL_SORT_ORDER),
    }),
    page: this.fb.control(INITIAL_PAGE),
  });

  /** Whether it is first page, used for button disabling. */
  public isFirstPage$ = this.filmService.isFirstPage$;

  /** Whether it is last page, used for button disabling. */
  public isLastPage$ = this.filmService.isLastPage$;

  public constructor(
    private readonly fb: FormBuilder,
    private readonly filmService: FilmService,
  ) {}

  /** @inheritdoc */
  public ngOnInit(): void {
    const searchTextControl = this.filtersForm.get('searchText');
    searchTextControl?.valueChanges.subscribe((text: string) => {
      if (searchTextControl.pristine) {
        return;
      }

      this.resetSortOptions();
      this.filmService.setSearchText(text);
    });

    const sortControl = this.filtersForm.get('sort');
    sortControl?.valueChanges.subscribe((sortOptions: SortOptions) => {
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
      order: INITIAL_SORT_ORDER,
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
