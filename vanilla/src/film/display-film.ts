import { Film } from '../entities/film/types';
import { formatDate } from '../utils/format-date';

/**
 * Create film element.
 * @param film Film data.
 */
function createFilmEl(film: Film): HTMLDivElement {
  const node = document.createElement('div');
  node.classList.add('film');
  node.innerHTML = `
<h1 class="film__title">${film.title}</h1>
<div class="film__producer film__meta-info meta-info">
  <div class="meta-info__label">Opening crawl</div><div class="meta-info__text">${film.openingCrawl}</div>
</div>
<div class="film__producer film__meta-info meta-info">
  <div class="meta-info__label">Produced by</div><div class="meta-info__text">${film.producer}</div>
</div>
<div class="film__director film__meta-info meta-info">
  <div class="meta-info__label">Directed by</div><div class="meta-info__text">${film.director}</div>
</div>
<div class="film__releaseDate film__meta-info meta-info">
  <div class="meta-info__label">Released at</div><div class="meta-info__text">${formatDate(film.releaseDate)}</div>
</div>
<div class="film__releaseDate film__meta-info meta-info">
  <div class="meta-info__label">Characters</div><div class="meta-info__text">${film.characterIds.join(', ')}</div>
</div>
<div class="film__releaseDate film__meta-info meta-info">
  <div class="meta-info__label">Species</div><div class="meta-info__text">${film.specieIds.join(', ')}</div>
</div>
<div class="film__releaseDate film__meta-info meta-info">
  <div class="meta-info__label">Starships</div><div class="meta-info__text">${film.starshipIds.join(', ')}</div>
</div>
<div class="film__releaseDate film__meta-info meta-info">
  <div class="meta-info__label">Vehicles</div><div class="meta-info__text">${film.vehicleIds.join(', ')}</div>
</div>
`;
  return node;
}

/**
 * Display film on the page.
 * @param film Film.
 */
export function displayFilm(film: Film): void {
  const filmPageEl = document.querySelector<HTMLElement>('.film-page');

  if (filmPageEl === null) {
    return;
  }

  filmPageEl.innerHTML = '';

  filmPageEl.appendChild(createFilmEl(film));
}
