import { Component, OnInit, ChangeDetectionStrategy, Self, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { PaginationDirection, FilterOptions, PagesStatus } from 'src/app/core/services/films/utils/types';
import { TO_READABLE_SORT_DIRECTION_MAP, TO_READABLE_SORT_FIELD_MAP } from 'src/app/core/services/firestore/utils/maps';
import { SortDirection, SortField } from 'src/app/core/services/firestore/utils/types';

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

  /** Page status. */
  @Input()
  public pagesStatus: PagesStatus | null = null;

  /** Pagination change. */
  @Output()
  public readonly changePage = new EventEmitter<PaginationDirection>();

  /** Filter options change. */
  @Output()
  public readonly changeFilterOptions = new EventEmitter<FilterOptions>();

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

  public constructor(
    @Self() private readonly destroy$: DestroyService,
    private readonly fb: FormBuilder,
  ) {}

  /** @inheritdoc */
  public ngOnInit(): void {
    this.filtersForm.get('searchText')?.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap(searchText => {
          if (searchText !== '') {
            this.filtersForm.get('sortOptions')?.disable();
          } else {
            this.filtersForm.get('sortOptions')?.enable();
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();

    this.filtersForm.get('sortOptions')?.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap(sortOptions => {
          if (sortOptions.field !== INITIAL_SORT_FIELD || sortOptions.direction !== INITIAL_SORT_DIRECTION) {
            this.filtersForm.get('searchText')?.disable();
          } else {
            this.filtersForm.get('searchText')?.enable();
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  /** Handle filters apply. */
  public onFiltersApply(): void {
    const { searchText, sortOptions } = this.filtersForm.value as FilterOptions;
    if (searchText !== '' && searchText != null) {
      return this.changeFilterOptions.emit({
        searchText,
        sortOptions: null,
      });
    }
    return this.changeFilterOptions.emit({
      searchText: null,
      sortOptions,
    });
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
    this.changePage.emit(PaginationDirection.Next);
  }

  /** Handle previous page button click. */
  public onPrevPage(): void {
    this.changePage.emit(PaginationDirection.Prev);
  }
}
