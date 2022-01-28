import { loadNextPage, updatePaginationButtons } from './pagination';
import { changeStore } from './store';

interface SortElements {

  /** Sort field, for example: title, producer. */
  sortFieldEl: HTMLSelectElement | null;

  /** Sort type (ascending, descending). */
  sortTypeEl: HTMLSelectElement | null;
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

  changeStore({
    sortField: sortFieldEl.value,
    sortType: sortTypeEl.value,
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

  sortTypeEl.addEventListener('change', onSortChange);
}
