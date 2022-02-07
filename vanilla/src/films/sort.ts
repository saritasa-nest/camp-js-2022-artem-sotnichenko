import { SortField, SortType } from '../entities/film/types';
import { ERROR_SORT_ELEMENTS_ARE_NULL } from '../utils/constants';

import { loadNextPage, updatePaginationButtons } from './pagination';
import { changeStore } from './store';

interface SortElements {

  /** Sort field, for example: title, producer. */
  readonly sortFieldEl: HTMLSelectElement;

  /** Sort type (ascending, descending). */
  readonly sortTypeEl: HTMLSelectElement;
}

/** Returns select elements that involved in sorting. */
function getSortElements(): SortElements {
  const sortFieldEl = document.querySelector<HTMLSelectElement>('.films__sort--field .sort__select');
  const sortTypeEl = document.querySelector<HTMLSelectElement>('.films__sort--type .sort__select');

  if (sortFieldEl === null || sortTypeEl === null) {
    throw new Error(ERROR_SORT_ELEMENTS_ARE_NULL);
  }

  return {
    sortFieldEl,
    sortTypeEl,
  };
}

/** Handler when sort options change. */
async function onSortChange(): Promise<void> {
  const {
    sortFieldEl,
    sortTypeEl,
  } = getSortElements();

  let sortField: SortField = SortField.Title;
  if (
    sortFieldEl.value === SortField.Title ||
    sortFieldEl.value === SortField.Producer ||
    sortFieldEl.value === SortField.Director ||
    sortFieldEl.value === SortField.ReleaseDate
  ) {
    sortField = sortFieldEl.value;
  }

  let sortType: SortType = SortType.Ascending;
  if (sortTypeEl.value === SortType.Descending) {
    sortType = sortTypeEl.value;
  }

  changeStore({
    sortField,
    sortType,
    lastId: null,
    firstId: null,
    isFirstPage: false,
    isLastPage: false,
  });

  await loadNextPage();

  changeStore({
    isFirstPage: true,
    isLastPage: false,
  });
  updatePaginationButtons();
}

/**
 * Setup sort field.
 * @param sortFieldEl Sort field element.
 */
function setupSortField(sortFieldEl: HTMLSelectElement): void {
  sortFieldEl.innerHTML = Object.entries(SortField)
    .map(([name, value]) => `<option value="${value}">${name}</option>`)
    .reduce((acc, cur) => `${acc}\n${cur}`);
}

/**
 * Setup sort type.
 * @param sortTypeEl Sort type element.
 */
function setupSortType(sortTypeEl: HTMLSelectElement): void {
  sortTypeEl.innerHTML = Object.entries(SortType)
    .map(([name, value]) => `<option value="${value}">${name}</option>`)
    .reduce((acc, cur) => `${acc}\n${cur}`);
}

/** Sets up sorting, add listeners on sort elements. */
export function setupSorting(): void {
  const {
    sortFieldEl,
    sortTypeEl,
  } = getSortElements();

  setupSortField(sortFieldEl);
  setupSortType(sortTypeEl);

  sortFieldEl.addEventListener('change', onSortChange);
  sortTypeEl.addEventListener('change', onSortChange);
}
