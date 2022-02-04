import { formatDate } from '../utils/format-date';
import { ConnectedFilm } from '../entities/connected-film/types';

/**
 * Create film element.
 * @param film Film data.
 */
function createFilmEl(film: ConnectedFilm): HTMLDivElement {
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
<div class="film__characters film__meta-info meta-info">
  <div class="meta-info__label">Characters</div>
</div>
<div class="film__species film__meta-info meta-info">
  <div class="meta-info__label">Species</div>
</div>
<div class="film__starships film__meta-info meta-info">
  <div class="meta-info__label">Starships</div>
</div>
<div class="film__vehicles film__meta-info meta-info">
  <div class="meta-info__label">Vehicles</div>
</div>
<div class="film__planets film__meta-info meta-info">
  <div class="meta-info__label">Planets</div>
</div>
`;

  node.querySelector('.film__characters')?.append(createEntityListEl(film.characters, 'characters', 'name'));
  node.querySelector('.film__species')?.append(createEntityListEl(film.species, 'species', 'name'));
  node.querySelector('.film__starships')?.append(createEntityListEl(film.starships, 'starships', 'class'));
  node.querySelector('.film__vehicles')?.append(createEntityListEl(film.vehicles, 'vehicles', 'class'));
  node.querySelector('.film__planets')?.append(createEntityListEl(film.planets, 'planets', 'name'));

  return node;
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
  const filmPageEl = document.querySelector<HTMLElement>('.film-page');

  if (filmPageEl === null) {
    return;
  }

  filmPageEl.innerHTML = '';

  filmPageEl.appendChild(createFilmEl(film));
}
