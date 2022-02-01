import { Film } from '../entities/film/types';

/**
 * Format date to "Month Day, Year" format.
 * @param date Date object to format.
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
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
<div class="film__producer film__meta-info meta-info">
  <div class="meta-info__label">produced by</div><div class="meta-info__text">${film.producer}</div>
</div>
<div class="film__director film__meta-info meta-info">
  <div class="meta-info__label">directed by</div><div class="meta-info__text">${film.director}</div>
</div>
<div class="film__releaseDate film__meta-info meta-info">
  <div class="meta-info__label">released at</div><div class="meta-info__text">${formatDate(film.releaseDate)}</div>
</div>
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
    filmsListEl.appendChild(createFilmEl(film));
  });
}
