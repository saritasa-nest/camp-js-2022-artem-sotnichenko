import { SortField, SortType } from '../entities/film/types';
import { ERROR_SORT_ELEMENTS_ARE_NULL } from '../utils/constants';

import { loadNextPage, updatePaginationButtons } from './pagination';
import { changeStore } from './store';

interface SortElements {

  /** Sort field, for example: title, producer. */
  readonly sortFieldElement: HTMLSelectElement;

  /** Sort type (ascending, descending). */
  readonly sortTypeElement: HTMLSelectElement;
}

/** Returns select elements that involved in sorting. */
function getSortElements(): SortElements {
  const sortFieldElement = document.querySelector<HTMLSelectElement>('.films__sort--field .sort__select');
  const sortTypeElement = document.querySelector<HTMLSelectElement>('.films__sort--type .sort__select');

  if (sortFieldElement === null || sortTypeElement === null) {
    throw new Error(ERROR_SORT_ELEMENTS_ARE_NULL);
  }

  return {
    sortFieldElement,
    sortTypeElement,
  };
}

/** Handler when sort options change. */
async function onSortChange(): Promise<void> {
  const {
    sortFieldElement,
    sortTypeElement,
  } = getSortElements();

  let sortField: SortField = SortField.Title;
  if (
    sortFieldElement.value === SortField.Title ||
    sortFieldElement.value === SortField.Producer ||
    sortFieldElement.value === SortField.Director ||
    sortFieldElement.value === SortField.ReleaseDate
  ) {
    sortField = sortFieldElement.value;
  }

  let sortType: SortType = SortType.Ascending;
  if (sortTypeElement.value === SortType.Descending) {
    sortType = sortTypeElement.value;
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
 * @param sortFieldElement Sort field element.
 */
function setupSortField(sortFieldElement: HTMLSelectElement): void {
  sortFieldElement.innerHTML = Object.entries(SortField)
    .map(([name, value]) => `<option value="${value}">${name}</option>`)
    .reduce((acc, cur) => `${acc}\n${cur}`);
}

/**
 * Setup sort type.
 * @param sortTypeElement Sort type element.
 */
function setupSortType(sortTypeElement: HTMLSelectElement): void {
  sortTypeElement.innerHTML = Object.entries(SortType)
    .map(([name, value]) => `<option value="${value}">${name}</option>`)
    .reduce((acc, cur) => `${acc}\n${cur}`);
}

/** Sets up sorting, add listeners on sort elements. */
export function setupSorting(): void {
  const {
    sortFieldElement,
    sortTypeElement,
  } = getSortElements();

  setupSortField(sortFieldElement);
  setupSortType(sortTypeElement);

  sortFieldElement.addEventListener('change', onSortChange);
  sortTypeElement.addEventListener('change', onSortChange);
}
