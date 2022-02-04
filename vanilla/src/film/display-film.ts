import { formatDate } from '../utils/format-date';
import { Character } from '../entities/character/types';
import { ConnectedFilm } from '../entities/connected-film/types';
import { Specie } from '../entities/specie/types';
import { Starship } from '../entities/starship/types';
import { Vehicle } from '../entities/vehicle/types';
import { Planet } from '../entities/planet/types';

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

  node.querySelector('.film__characters')?.append(createCharactersEl(film.characters));
  node.querySelector('.film__species')?.append(createSpeciesEl(film.species));
  node.querySelector('.film__starships')?.append(createStarshipsEl(film.starships));
  node.querySelector('.film__vehicles')?.append(createVehiclesEl(film.vehicles));
  node.querySelector('.film__planets')?.append(createPlanetsEl(film.planets));

  return node;
}

/**
 * Create characters element.
 * @param characters Characters array.
 */
function createCharactersEl(characters: readonly Character[]): HTMLDivElement {
  const charactersEl = document.createElement('div');
  charactersEl.classList.add('characters');

  characters.forEach(character => {
    const characterEl = document.createElement('div');
    characterEl.classList.add('character');
    characterEl.innerHTML = `<a href="/character/?id=${character.id}">${character.name}</a>`;

    charactersEl.append(characterEl);
  });

  return charactersEl;
}

/**
 * Create species element.
 * @param species Species array.
 */
function createSpeciesEl(species: readonly Specie[]): HTMLDivElement {
  const speciesEl = document.createElement('div');
  speciesEl.classList.add('species');

  species.forEach(specie => {
    const specieEl = document.createElement('div');
    specieEl.classList.add('specie');
    specieEl.innerHTML = `<a href="/specie/?id=${specie.id}">${specie.name}</a>`;

    speciesEl.append(specieEl);
  });

  return speciesEl;
}

/**
 * Create starships element.
 * @param starships Starships array.
 */
function createStarshipsEl(starships: readonly Starship[]): HTMLDivElement {
  const starshipsEl = document.createElement('div');
  starshipsEl.classList.add('starships');

  starships.forEach(starship => {
    const starshipEl = document.createElement('div');
    starshipEl.classList.add('starship');
    starshipEl.innerHTML = `<a href="/starship/?id=${starship.id}">${starship.class}</a>`;

    starshipsEl.append(starshipEl);
  });

  return starshipsEl;
}

/**
 * Create vehicles element.
 * @param vehicles Vehicles array.
 */
function createVehiclesEl(vehicles: readonly Vehicle[]): HTMLDivElement {
  const vehiclesEl = document.createElement('div');
  vehiclesEl.classList.add('vehicles');

  vehicles.forEach(vehicle => {
    const vehicleEl = document.createElement('div');
    vehicleEl.classList.add('vehicle');
    vehicleEl.innerHTML = `<a href="/vehicle/?id=${vehicle.id}">${vehicle.class}</a>`;

    vehiclesEl.append(vehicleEl);
  });

  return vehiclesEl;
}

/**
 * Create planets element.
 * @param planets Planets array.
 */
function createPlanetsEl(planets: readonly Planet[]): HTMLDivElement {
  const planetsEl = document.createElement('div');
  planetsEl.classList.add('planets');

  planets.forEach(planet => {
    const planetEl = document.createElement('div');
    planetEl.classList.add('planet');
    planetEl.innerHTML = `<a href="/planet/?id=${planet.id}">${planet.name}</a>`;

    planetsEl.append(planetEl);
  });

  return planetsEl;
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
