import { getFilmsAfterId, getFilmsBeforeId } from '../entities/film';
import { Film, SortType } from '../entities/film/types';
import { ERROR_PAGINATION_ELEMENTS_ARE_NULL, FILMS_COUNT_PER_PAGE } from '../utils/constants';

import { displayFilms } from './display-films';
import { changeStore, getStore } from './store';

/** Sets up pagination, add listeners on buttons. */
export function setupPagination(): void {
  const {
    paginationNextElement,
    paginationPrevElement,
  } = getPaginationElements();

  paginationNextElement.addEventListener('click', loadNextPage);
  paginationPrevElement.addEventListener('click', loadPrevPage);
}

interface PaginationElements {

  /** Next page button. */
  readonly paginationNextElement: HTMLButtonElement;

  /** Previous page button. */
  readonly paginationPrevElement: HTMLButtonElement;
}

/** Get pagination elements. */
function getPaginationElements(): PaginationElements {
  const paginationNextElement = document.querySelector<HTMLButtonElement>('.pagination__next');
  const paginationPrevElement = document.querySelector<HTMLButtonElement>('.pagination__prev');

  if (paginationNextElement === null || paginationPrevElement === null) {
    throw new Error(ERROR_PAGINATION_ELEMENTS_ARE_NULL);
  }

  return {
    paginationNextElement,
    paginationPrevElement,
  };
}

/** Load next page of films. */
export async function loadNextPage(): Promise<void> {
  const {
    isLastPage,
    sortField,
    sortType,
    lastId,
    substringSearch,
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
    substringSearch,
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
    substringSearch,
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
    substringSearch,
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
    paginationNextElement,
    paginationPrevElement,
  } = getPaginationElements();

  const {
    isLastPage,
    isFirstPage,
  } = getStore();

  paginationNextElement.disabled = isLastPage;
  paginationPrevElement.disabled = isFirstPage;
}

/**
 * Update pagination when user typing in searchfield.
 * @param films Films.
 */
export function updatePaginationBySearchInput(films: Film[]): void {

  displayFilms(films);
  if (films.length < FILMS_COUNT_PER_PAGE) {
    changeStore({
      isLastPage: true,
    });
    return updatePaginationButtons();
  }
  changeStore({
    isLastPage: false,
    isFirstPage: true,
    lastId: films[films.length - 1].id,
    firstId: films[0].id,
  });
  updatePaginationButtons();
}
