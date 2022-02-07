import { Film } from '../entities/film/types';

/**
 * Get filled form.
 */
export function getForm(): Film | null {
  const titleElement = document.querySelector<HTMLInputElement>('.input-title');
  const сrawlElement = document.querySelector<HTMLInputElement>('.input-opening-crawl');
  const producedElement = document.querySelector<HTMLInputElement>('.input-produced');
  const directedElement = document.querySelector<HTMLInputElement>('.input-directed');
  const releasedElement = document.querySelector<HTMLInputElement>('.input-released');
  const charactersElement = document.querySelector<HTMLSelectElement>('#characters');
  const speciesElement = document.querySelector<HTMLSelectElement>('#species');
  const starshipsElement = document.querySelector<HTMLSelectElement>('#starships');
  const vehiclesElement = document.querySelector<HTMLSelectElement>('#vehicles');
  const planetsElement = document.querySelector<HTMLSelectElement>('#planets');

  if (
    titleElement === null ||
    сrawlElement === null ||
    producedElement === null ||
    directedElement === null ||
    releasedElement === null ||
    charactersElement === null ||
    speciesElement === null ||
    starshipsElement === null ||
    vehiclesElement === null ||
    planetsElement === null
  ) {
    return null;
  }

  const form: Film = {
    title: titleElement.value,
    openingCrawl: сrawlElement.value,
    producer: producedElement.value,
    director: directedElement.value,
    releaseDate: new Date(releasedElement.value),
    characterIds: Array.from(charactersElement.selectedOptions).map(element => element.value),
    speciesIds: Array.from(speciesElement.selectedOptions).map(element => element.value),
    starshipIds: Array.from(starshipsElement.selectedOptions).map(element => element.value),
    vehicleIds: Array.from(vehiclesElement.selectedOptions).map(element => element.value),
    planetIds: Array.from(planetsElement.selectedOptions).map(element => element.value),
  };

  return form;
}
