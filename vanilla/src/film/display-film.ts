import { formatDate } from '../utils/format-date';
import { ConnectedFilm } from '../entities/connected-film/types';

/**
 * Create film element.
 * @param film Film data.
 */
function createFilmInfoEl(film: ConnectedFilm): HTMLDivElement {
  const infoEl = document.createElement('div');

  infoEl.classList.add('film__info');
  infoEl.innerHTML = `
<div class="film__producer film__meta-info meta-info">
  <h2 class="meta-info__subtitle">Opening crawl</h2><div class="meta-info__text">${film.openingCrawl}</div>
</div>
<div class="film__producer film__meta-info meta-info">
  <h2 class="meta-info__subtitle">Produced by</h2><div class="meta-info__text">${film.producer}</div>
</div>
<div class="film__director film__meta-info meta-info">
  <h2 class="meta-info__subtitle">Directed by</h2><div class="meta-info__text">${film.director}</div>
</div>
<div class="film__releaseDate film__meta-info meta-info">
  <h2 class="meta-info__subtitle">Released at</h2><div class="meta-info__text">${formatDate(film.releaseDate)}</div>
</div>
<div class="film__characters film__meta-info meta-info">
  <h2 class="meta-info__subtitle">Characters</h2>
</div>
<div class="film__species film__meta-info meta-info">
  <h2 class="meta-info__subtitle">Species</h2>
</div>
<div class="film__starships film__meta-info meta-info">
  <h2 class="meta-info__subtitle">Starships</h2>
</div>
<div class="film__vehicles film__meta-info meta-info">
  <h2 class="meta-info__subtitle">Vehicles</h2>
</div>
<div class="film__planets film__meta-info meta-info">
  <h2 class="meta-info__subtitle">Planets</h2>
</div>
`;

  infoEl.querySelector('.film__characters')?.append(createEntityListEl(film.characters, 'characters', 'name'));
  infoEl.querySelector('.film__species')?.append(createEntityListEl(film.species, 'species', 'name'));
  infoEl.querySelector('.film__starships')?.append(createEntityListEl(film.starships, 'starships', 'class'));
  infoEl.querySelector('.film__vehicles')?.append(createEntityListEl(film.vehicles, 'vehicles', 'class'));
  infoEl.querySelector('.film__planets')?.append(createEntityListEl(film.planets, 'planets', 'name'));

  return infoEl;
}

interface Entity {

  /** Entity id. */
  id: string;
}

/**
 * Create entitiy list element.
 * @param entities Entity array.
 * @param name Name of entity, used for class and url.
 * @param textKey Key for value to use as link text.
 */
function createEntityListEl<E extends Entity>(entities: readonly E[], name: string, textKey: keyof E): HTMLDivElement {
  const entitiesEl = document.createElement('div');
  entitiesEl.classList.add(`${name}-list`, 'meta-info__list');

  entities.forEach(entity => {
    const entityEl = document.createElement('div');
    entityEl.classList.add(name);
    entityEl.innerHTML = `<a href="/${name}/?id=${entity.id}">${entity[textKey]}</a>`;

    entitiesEl.append(entityEl);
  });

  return entitiesEl;
}

/**
 * Display film on the page.
 * @param film Film.
 */
export function displayFilm(film: ConnectedFilm): void {
  const filmEl = document.querySelector<HTMLElement>('.film');
  const titleEl = document.querySelector<HTMLElement>('.film__title');

  if (filmEl === null || titleEl === null) {
    return;
  }

  titleEl.textContent = film.title;
  filmEl.appendChild(createFilmInfoEl(film));
}
