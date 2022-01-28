import { sortFields, sortTypes } from '../entities/film/fetch';
import { SortField, SortType } from '../entities/film/types';

import { loadNextPage, updatePaginationButtons } from './pagination';
import { changeStore } from './store';

interface SortElements {

  /** Sort field, for example: title, producer. */
  readonly sortFieldEl: HTMLSelectElement | null;

  /** Sort type (ascending, descending). */
  readonly sortTypeEl: HTMLSelectElement | null;
}

/** Returns select elements that involved in sorting. */
function getSortElements(): SortElements {
  return {
    sortFieldEl: document.querySelector<HTMLSelectElement>('.films__sort--field .sort__select'),
    sortTypeEl: document.querySelector<HTMLSelectElement>('.films__sort--type .sort__select'),
  };
}

/** Handler when sort options change. */
async function onSortChange(): Promise<void> {
  const {
    sortFieldEl,
    sortTypeEl,
  } = getSortElements();

  if (sortFieldEl === null || sortTypeEl === null) {
    return;
  }

  let sortField: SortField = sortFields.title;
  if (
    sortFieldEl.value === 'title' ||
    sortFieldEl.value === 'producer' ||
    sortFieldEl.value === 'director' ||
    sortFieldEl.value === 'releaseDate'
  ) {
    sortField = sortFields[sortFieldEl.value];
  }

  let sortType: SortType = sortTypes.ascending;
  if (sortTypeEl.value === 'descending') {
    sortType = sortTypes[sortTypeEl.value];
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

/** Sets up sorting, add listeners on sort elements. */
export function setupSorting(): void {
  const {
    sortFieldEl,
    sortTypeEl,
  } = getSortElements();

  if (sortFieldEl === null || sortTypeEl === null) {
    return;
  }

  sortFieldEl.addEventListener('change', onSortChange);
  sortTypeEl.addEventListener('change', onSortChange);
}
