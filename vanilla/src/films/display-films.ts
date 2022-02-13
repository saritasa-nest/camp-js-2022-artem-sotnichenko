import { Film } from '../entities/film/types';
import { formatDate } from '../utils/format-date';

/**
 * Create film element.
 * @param film Film data.
 */
function createFilmElement(film: Film): HTMLDivElement {
  const node = document.createElement('div');
  node.classList.add('film');
  node.innerHTML = `
<h2 class="film__title">
  <a href="/film/?id=${film.id}">${film.title}</a>
</h2>
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
  const filmsListElement = document.querySelector<HTMLElement>('.films__list');
  if (filmsListElement === null) {
    return;
  }

  filmsListElement.innerHTML = '';

  films.forEach(film => {
    filmsListElement.appendChild(createFilmElement(film));
  });
}
