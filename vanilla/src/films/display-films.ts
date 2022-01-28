import { Film } from '../entities/film/types';

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
export function displayFilms(films: Film[]): void {
  const filmsListEl = document.querySelector<HTMLElement>('.films__list');
  if (filmsListEl === null) {
    return;
  }

  filmsListEl.innerHTML = '';

  films.forEach(film => {
    filmsListEl?.appendChild(createFilmEl(film));
  });
}
