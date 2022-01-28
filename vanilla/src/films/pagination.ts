import { getFilmsAfterId, getFilmsBeforeId } from '../entities/film';
import { SortType } from '../entities/film/types';
import { FILMS_COUNT_PER_PAGE } from '../utils/constants';

import { displayFilms } from './display-films';
import { changeStore, getStore } from './store';

/** Sets up pagination, add listeners on buttons */
export function setupPagination(): void {
  const {
    paginationNextEl,
    paginationPrevEl,
  } = getPaginationElements();

  paginationNextEl?.addEventListener('click', loadNextPage);
  paginationPrevEl?.addEventListener('click', loadPrevPage);
}

interface PaginationElements {

  /** Next page button. */
  readonly paginationNextEl: HTMLButtonElement | null;

  /** Previous page button. */
  readonly paginationPrevEl: HTMLButtonElement | null;
}

/** Get pagination elements. */
function getPaginationElements(): PaginationElements {
  return {
    paginationNextEl: document.querySelector<HTMLButtonElement>('.pagination__next'),
    paginationPrevEl: document.querySelector<HTMLButtonElement>('.pagination__prev'),
  };
}

/** Load next page of films. */
export async function loadNextPage(): Promise<void> {
  const store = getStore();

  if (store.isLastPage) {
    updatePaginationButtons();
    return;
  }

  const films = await getFilmsAfterId({
    limit: FILMS_COUNT_PER_PAGE,
    orderBy: store.sortField,
    isDescending: store.sortType === SortType.Descending,
    startAfter: store.lastId,
  });

  if (films.length < FILMS_COUNT_PER_PAGE) {
    changeStore({
      isLastPage: true,
    });

    return updatePaginationButtons();
  }
  changeStore({
    isFirstPage: false,
    lastId: films[films.length - 1].id,
    firstId: films[0].id,
  });

  await displayFilms(films);
  await updatePaginationButtons();
}

/** Load previous page of films. */
export async function loadPrevPage(): Promise<void> {
  const store = getStore();

  if (store.isFirstPage) {
    updatePaginationButtons();
    return;
  }

  const films = await getFilmsBeforeId({
    limit: FILMS_COUNT_PER_PAGE,
    orderBy: store.sortField,
    isDescending: store.sortType === SortType.Descending,
    endBefore: store.firstId,
  });

  if (films.length < FILMS_COUNT_PER_PAGE) {
    changeStore({
      isFirstPage: true,
    });
    return updatePaginationButtons();
  }
  changeStore({
    isLastPage: false,
    lastId: films[films.length - 1].id,
    firstId: films[0].id,
  });

  await displayFilms(films);
  await updatePaginationButtons();
}

/** Update pagination buttons. */
export function updatePaginationButtons(): void {
  const store = getStore();

  const {
    paginationNextEl,
    paginationPrevEl,
  } = getPaginationElements();

  if (paginationPrevEl === null || paginationNextEl === null) {
    return;
  }

  paginationNextEl.disabled = !!store.isLastPage;
  paginationPrevEl.disabled = !!store.isFirstPage;
}
