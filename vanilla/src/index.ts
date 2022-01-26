/* eslint-disable require-atomic-updates */
import { getFilmsAfterId, getFilmsBeforeId } from './firebase/film';
import { Film } from './firebase/film/types';

const FILMS_COUNT_PER_PAGE = 2;

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
  if (!filmsListEl) {
    return;
  }

  filmsListEl.innerHTML = '';

  films.forEach(film => {
    filmsListEl?.appendChild(createFilmEl(film));
  });
}

let lastId: string | undefined;
let firstId: string | undefined;

let isLastPage = false;
let isFirstPage = true;

/** Load next page of films. */
async function loadNextPage(): Promise<void> {
  if (isLastPage) {
    updatePaginationButtons();
    return;
  }

  const films = await getFilmsAfterId({
    limit: FILMS_COUNT_PER_PAGE,
    orderBy: 'fields.title',
    startAfter: lastId,
  });

  if (films.length < FILMS_COUNT_PER_PAGE) {
    isLastPage = true;
    return;
  }
  isFirstPage = false;

  lastId = films[films.length - 1].id;
  firstId = films[0].id;

  await displayFilms(films);
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
    return;
  }
  isLastPage = false;

  lastId = films[films.length - 1].id;
  firstId = films[0].id;

  await displayFilms(films);

}

/** Update pagination buttons. */
function updatePaginationButtons(): void {
  const filmsPaginationNextEl = document.querySelector<HTMLButtonElement>('.pagination__next');
  const filmsPaginationPrevEl = document.querySelector<HTMLButtonElement>('.pagination__prev');

  if (!filmsPaginationPrevEl || !filmsPaginationNextEl) {
    return;
  }

  filmsPaginationNextEl.disabled = false;
  filmsPaginationPrevEl.disabled = false;

  if (isFirstPage) {
    filmsPaginationPrevEl.disabled = true;
  }
  if (isLastPage) {
    filmsPaginationNextEl.disabled = true;
  }
}

await loadNextPage();
isFirstPage = true;
updatePaginationButtons();

const filmsPaginationNextEl = document.querySelector<HTMLButtonElement>('.pagination__next');
const filmsPaginationPrevEl = document.querySelector<HTMLButtonElement>('.pagination__prev');

filmsPaginationNextEl?.addEventListener('click', loadNextPage);
filmsPaginationPrevEl?.addEventListener('click', loadPrevPage);
