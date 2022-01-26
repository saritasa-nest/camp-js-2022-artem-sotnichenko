import { getFilms } from './firebase/film';
import { Film } from './firebase/film/types';

const filmsListEl = document.querySelector<HTMLElement>('.films__list');

const allFilms = await getFilms();

displayFilms(allFilms);

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
  if (!filmsListEl) {
    return;
  }

  filmsListEl.innerHTML = '';

  films.forEach(film => {
    filmsListEl?.appendChild(createFilmEl(film));
  });
}
