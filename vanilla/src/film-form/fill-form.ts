import { Character } from '../entities/character/types';
import { ConnectedFilm } from '../entities/connected-film/types';
import { Planet } from '../entities/planet/types';
import { Species } from '../entities/species/types';
import { Starship } from '../entities/starship/types';
import { Vehicle } from '../entities/vehicle/types';

interface SelectLists {

  /** List of characters. */
  characters: Character[];

  /** List of species. */
  species: Species[];

  /** List of starships. */
  starships: Starship[];

  /** List of vehicles. */
  vehicles: Vehicle[];

  /** List of planets. */
  planets: Planet[];
}

/**
 * Fill form.
 * @param connectedFilm Connected film.
 * @param selectLists Lists from wich selects are filled.
 */
export function fillForm(connectedFilm: ConnectedFilm, selectLists: SelectLists): void {
  const titleElement = document.querySelector<HTMLInputElement>('.input-title');
  const сrawlElement = document.querySelector<HTMLInputElement>('.input-opening-crawl');
  const producedElement = document.querySelector<HTMLInputElement>('.input-produced');
  const directedElement = document.querySelector<HTMLInputElement>('.input-directed');
  const releasedElement = document.querySelector<HTMLInputElement>('.input-released');

  if (
    titleElement === null ||
    сrawlElement === null ||
    producedElement === null ||
    directedElement === null ||
    releasedElement === null
  ) {
    return;
  }

  titleElement.value = connectedFilm.title;
  сrawlElement.value = connectedFilm.openingCrawl;
  producedElement.value = connectedFilm.producer;
  directedElement.value = connectedFilm.director;
  releasedElement.value = connectedFilm.releaseDate.toISOString().slice(0, 10);

  const entries = Object.entries(selectLists) as [keyof SelectLists, SelectLists[keyof SelectLists]][];
  for (const [collectionName, list] of entries) {
    const selectEl = document.getElementById(collectionName);
    if (selectEl === null) {
      return;
    }

    selectEl.innerHTML = (list as SelectLists[keyof SelectLists])
      .map(el => {
        let optionName;
        if ('name' in el) {
          // eslint-disable-next-line prefer-destructuring
          optionName = el.name;
        } else if ('class' in el) {
          optionName = el.class;
        }

        const isSelected = connectedFilm[collectionName].some(entity => entity.id === el.id);

        return `<option ${isSelected ? 'selected' : ''} value="${el.id}">${optionName}</option>`;
      })
      .reduce((acc, optionString) => `${acc}\n${optionString}`, '');
  }
}
