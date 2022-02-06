import { getFilmsAfterId, getFilmsBeforeId } from '../entities/film';
import { SortType } from '../entities/film/types';
import { ERROR_PAGINATION_ELEMENTS_ARE_NULL, FILMS_COUNT_PER_PAGE } from '../utils/constants';

import { displayFilms } from './display-films';
import { changeStore, getStore } from './store';

/** Sets up pagination, add listeners on buttons. */
export function setupPagination(): void {
  const {
    paginationNextEl,
    paginationPrevEl,
  } = getPaginationElements();

  paginationNextEl.addEventListener('click', loadNextPage);
  paginationPrevEl.addEventListener('click', loadPrevPage);
}

interface PaginationElements {

  /** Next page button. */
  readonly paginationNextEl: HTMLButtonElement;

  /** Previous page button. */
  readonly paginationPrevEl: HTMLButtonElement;
}

/** Get pagination elements. */
function getPaginationElements(): PaginationElements {
  const paginationNextEl = document.querySelector<HTMLButtonElement>('.pagination__next');
  const paginationPrevEl = document.querySelector<HTMLButtonElement>('.pagination__prev');

  if (paginationNextEl === null || paginationPrevEl === null) {
    throw new Error(ERROR_PAGINATION_ELEMENTS_ARE_NULL);
  }

  return {
    paginationNextEl,
    paginationPrevEl,
  };
}

/** Load next page of films. */
export async function loadNextPage(): Promise<void> {
  const {
    isLastPage,
    sortField,
    sortType,
    lastId,
  } = getStore();

  // disable 'next' button
  if (isLastPage) {
    updatePaginationButtons();
    return;
  }

  const films = await getFilmsAfterId({
    limit: FILMS_COUNT_PER_PAGE,
    orderBy: sortField,
    isDescending: sortType === SortType.Descending,
    startAfter: lastId,
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

  displayFilms(films);
  updatePaginationButtons();
}

/** Load previous page of films. */
export async function loadPrevPage(): Promise<void> {
  const {
    isFirstPage,
    sortField,
    sortType,
    firstId,
  } = getStore();

  // disable 'prev' button
  if (isFirstPage) {
    updatePaginationButtons();
    return;
  }

  const films = await getFilmsBeforeId({
    limit: FILMS_COUNT_PER_PAGE,
    orderBy: sortField,
    isDescending: sortType === SortType.Descending,
    endBefore: firstId,
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

  displayFilms(films);
  updatePaginationButtons();
}

/** Update pagination buttons. */
export function updatePaginationButtons(): void {
  const {
    paginationNextEl,
    paginationPrevEl,
  } = getPaginationElements();

  const {
    isLastPage,
    isFirstPage,
  } = getStore();

  paginationNextEl.disabled = isLastPage;
  paginationPrevEl.disabled = isFirstPage;
}
