import { formatDate } from '../utils/format-date';
import { ConnectedFilm } from '../entities/connected-film/types';

/**
 * Create film element.
 * @param film Film data.
 */
function createFilmInfoElement(film: ConnectedFilm): HTMLDivElement {
  const infoElement = document.createElement('div');

  infoElement.classList.add('film__info');
  infoElement.innerHTML = `
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

  infoElement.querySelector('.film__characters')?.append(createEntityListElement(film.characters, 'characters', 'name'));
  infoElement.querySelector('.film__species')?.append(createEntityListElement(film.species, 'species', 'name'));
  infoElement.querySelector('.film__starships')?.append(createEntityListElement(film.starships, 'starships', 'class'));
  infoElement.querySelector('.film__vehicles')?.append(createEntityListElement(film.vehicles, 'vehicles', 'class'));
  infoElement.querySelector('.film__planets')?.append(createEntityListElement(film.planets, 'planets', 'name'));

  return infoElement;
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
function createEntityListElement<E extends Entity>(entities: readonly E[], name: string, textKey: keyof E): HTMLDivElement {
  const entitiesElement = document.createElement('div');
  entitiesElement.classList.add(`${name}-list`, 'meta-info__list');

  entities.forEach(entity => {
    const entityElement = document.createElement('div');
    entityElement.classList.add(name);
    entityElement.innerHTML = `<a href="/${name}/?id=${entity.id}">${entity[textKey]}</a>`;

    entitiesElement.append(entityElement);
  });

  return entitiesElement;
}

/**
 * Display film on the page.
 * @param film Film.
 */
export function displayFilm(film: ConnectedFilm): void {
  const filmElement = document.querySelector<HTMLElement>('.film');
  const titleElement = document.querySelector<HTMLElement>('.film__title');

  if (filmElement === null || titleElement === null) {
    return;
  }

  titleElement.textContent = film.title;
  filmElement.appendChild(createFilmInfoElement(film));
}
