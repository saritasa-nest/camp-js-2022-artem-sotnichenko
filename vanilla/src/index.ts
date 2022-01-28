/* eslint-disable require-atomic-updates */
import { getFilmsAfterId, getFilmsBeforeId } from './firebase/film';
import { Film } from './firebase/film/types';

const FILMS_COUNT_PER_PAGE = 2;

let lastId: string | undefined;
let firstId: string | undefined;

let isLastPage = false;
let isFirstPage = false;

let sortField = 'title';
const sortType = 'ascending';

document.addEventListener('DOMContentLoaded', async e => {
  // Disable buttons before films are fetched.
  isFirstPage = true;
  isLastPage = true;
  updatePaginationButtons();
  isFirstPage = false;
  isLastPage = false;

  await loadNextPage();

  // Disable "prev" button.
  isFirstPage = true;
  updatePaginationButtons();

  const {
    paginationNextEl,
    paginationPrevEl,
  } = getPaginationElements();

  paginationNextEl?.addEventListener('click', loadNextPage);
  paginationPrevEl?.addEventListener('click', loadPrevPage);

  const sortFieldEl = document.querySelector<HTMLSelectElement>('.films__sort--field .sort__select');
  const sortTypeEl = document.querySelector<HTMLSelectElement>('.films__sort--type .sort__select');

  if (sortFieldEl === null || sortTypeEl === null) {
    return;
  }

  sortFieldEl.addEventListener('change', async() => {
    sortField = sortFieldEl.value;

    // fetch from beginning
    lastId = undefined;
    firstId = undefined;

    await loadNextPage();

    isFirstPage = true;
    isLastPage = false;
    updatePaginationButtons();
  });
});

interface PaginationElements {

  /** Next page button. */
  paginationNextEl: HTMLButtonElement | null;

  /** Previous page button. */
  paginationPrevEl: HTMLButtonElement | null;
}

/** Get pagination elements. */
function getPaginationElements(): PaginationElements {
  return {
    paginationNextEl: document.querySelector<HTMLButtonElement>('.pagination__next'),
    paginationPrevEl: document.querySelector<HTMLButtonElement>('.pagination__prev'),
  };
}

/** Load next page of films. */
async function loadNextPage(): Promise<void> {
  if (isLastPage) {
    updatePaginationButtons();
    return;
  }

  console.log('test', sortField);

  const films = await getFilmsAfterId({
    limit: FILMS_COUNT_PER_PAGE,
    orderBy: `fields.${sortField}`,
    startAfter: lastId,
  });

  console.log(films);

  if (films.length < FILMS_COUNT_PER_PAGE) {
    isLastPage = true;
    return updatePaginationButtons();
  }
  isFirstPage = false;

  lastId = films[films.length - 1].id;
  firstId = films[0].id;

  displayFilms(films);
  updatePaginationButtons();
}

/** Load previous page of films. */
async function loadPrevPage(): Promise<void> {
  if (isFirstPage) {
    updatePaginationButtons();
    return;
  }

  const films = await getFilmsBeforeId({
    limit: FILMS_COUNT_PER_PAGE,
    orderBy: 'fields.title',
    endBefore: firstId,
  });

  if (films.length < FILMS_COUNT_PER_PAGE) {
    isFirstPage = true;
    return updatePaginationButtons();
  }
  isLastPage = false;

  lastId = films[films.length - 1].id;
  firstId = films[0].id;

  await displayFilms(films);
  await updatePaginationButtons();
}

/** Update pagination buttons. */
function updatePaginationButtons(): void {
  const {
    paginationNextEl,
    paginationPrevEl,
  } = getPaginationElements();

  if (paginationPrevEl === null || paginationNextEl === null) {
    return;
  }

  console.log('145', isFirstPage);

  paginationNextEl.disabled = !!isLastPage;
  paginationPrevEl.disabled = !!isFirstPage;
}

function getSortOptions() {
  const sortFieldEl = document.querySelector<HTMLSelectElement>('.films__sort--field .sort__select');
  const sortTypeEl = document.querySelector<HTMLSelectElement>('.films__sort--type .sort__select');

  if (sortFieldEl === null || sortTypeEl === null) {
    return;
  }

  return {
    field: sortFieldEl.value,
    type: sortTypeEl.value,
  };
}

/**
 * Create film element.
 * @param film Film data.
 */
function createFilmEl(film: Film): HTMLDivElement {
  const node = document.createElement('div');
  node.classList.add('film');
  node.innerHTML = `
  <div class="film__title">${film.title}</div>
  <div class="film__producer">${film.producer}</div>
  <div class="film__releaseDate">${film.releaseDate}</div>
`;
  return node;
}

/**
 * Display film on the page.
 * @param films Films.
 */
function displayFilms(films: Film[]): void {
  const filmsListEl = document.querySelector<HTMLElement>('.films__list');
  if (filmsListEl === null) {
    return;
  }

  filmsListEl.innerHTML = '';

  films.forEach(film => {
    filmsListEl?.appendChild(createFilmEl(film));
  });
}
