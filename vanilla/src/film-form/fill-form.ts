import { Character } from '../entities/character/types';
import { ConnectedFilm } from '../entities/connected-film/types';
import { Planet } from '../entities/planet/types';
import { Species } from '../entities/species/types';
import { Starship } from '../entities/starship/types';
import { Vehicle } from '../entities/vehicle/types';

import { getFormElements } from './get-form-elements';

interface SelectLists {

  /** List of characters. */
  readonly characters: Character[];

  /** List of species. */
  readonly species: Species[];

  /** List of starships. */
  readonly starships: Starship[];

  /** List of vehicles. */
  readonly vehicles: Vehicle[];

  /** List of planets. */
  readonly planets: Planet[];
}

/**
 * Fill form.
 * @param connectedFilm Connected film.
 * @param selectLists Lists from wich selects are filled.
 */
export function fillForm(connectedFilm: ConnectedFilm, selectLists: SelectLists): void {
  const {
    titleElement,
    сrawlElement,
    producerElement,
    directorElement,
    releaseDateElement,
  } = getFormElements();

  titleElement.value = connectedFilm.title;
  сrawlElement.value = connectedFilm.openingCrawl;
  producerElement.value = connectedFilm.producer;
  directorElement.value = connectedFilm.director;
  releaseDateElement.value = connectedFilm.releaseDate.toISOString().slice(0, 10);

  const entries = Object.entries(selectLists) as [keyof SelectLists, SelectLists[keyof SelectLists]][];

  for (const [collectionName, list] of entries) {
    const selectElement = document.getElementById(collectionName);
    if (selectElement === null) {
      return;
    }

    selectElement.innerHTML = list
      .map(entity => {
        let optionName;
        if ('name' in entity) {
          // eslint-disable-next-line prefer-destructuring
          optionName = entity.name;
        } else if ('class' in entity) {
          optionName = entity.class;
        }

        const selectedAttribute = connectedFilm[collectionName]
          .some(connectedEntity => connectedEntity.id === entity.id) ? 'selected' : '';

        return `<option ${selectedAttribute} value="${entity.id}">${optionName}</option>`;
      })
      .reduce((htmlString, optionString) => `${htmlString}\n${optionString}`, '');
  }
}
