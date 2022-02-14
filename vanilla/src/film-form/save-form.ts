import { Film } from '../entities/film/types';

import { getFormElements } from './get-form-elements';

/**
 * Get filled form.
 */
export function getForm(): Film | null {
  const {
    titleElement,
    сrawlElement,
    producerElement,
    directorElement,
    releaseDateElement,
    charactersElement,
    speciesElement,
    starshipsElement,
    vehiclesElement,
    planetsElement,
  } = getFormElements();

  const form: Film = {
    title: titleElement.value,
    openingCrawl: сrawlElement.value,
    producer: producerElement.value,
    director: directorElement.value,
    releaseDate: new Date(releaseDateElement.value),
    characterIds: Array.from(charactersElement.selectedOptions).map(element => element.value),
    speciesIds: Array.from(speciesElement.selectedOptions).map(element => element.value),
    starshipIds: Array.from(starshipsElement.selectedOptions).map(element => element.value),
    vehicleIds: Array.from(vehiclesElement.selectedOptions).map(element => element.value),
    planetIds: Array.from(planetsElement.selectedOptions).map(element => element.value),
  };

  return form;
}
