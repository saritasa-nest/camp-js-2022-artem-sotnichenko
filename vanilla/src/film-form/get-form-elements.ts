import { ERROR_FORM_ELEMENTS_ARE_NULL } from '../utils/constants';

interface FormElements {

  /** Title element. */
  readonly titleElement: HTMLInputElement;

  /** Сrawl element. */
  readonly сrawlElement: HTMLTextAreaElement;

  /** Producer element. */
  readonly producerElement: HTMLInputElement;

  /** Director element. */
  readonly directorElement: HTMLInputElement;

  /** Release date element. */
  readonly releaseDateElement: HTMLInputElement;

  /** Characters element. */
  readonly charactersElement: HTMLSelectElement;

  /** Species element. */
  readonly speciesElement: HTMLSelectElement;

  /** Starships element. */
  readonly starshipsElement: HTMLSelectElement;

  /** Vehicles element. */
  readonly vehiclesElement: HTMLSelectElement;

  /** Planets element. */
  readonly planetsElement: HTMLSelectElement;
}

/** Return elements of form. */
export function getFormElements(): FormElements {
  const titleElement = document.querySelector<HTMLInputElement>('.input-title');
  const сrawlElement = document.querySelector<HTMLTextAreaElement>('.input-opening-crawl');
  const producerElement = document.querySelector<HTMLInputElement>('.input-produced');
  const directorElement = document.querySelector<HTMLInputElement>('.input-directed');
  const releaseDateElement = document.querySelector<HTMLInputElement>('.input-released');
  const charactersElement = document.querySelector<HTMLSelectElement>('#characters');
  const speciesElement = document.querySelector<HTMLSelectElement>('#species');
  const starshipsElement = document.querySelector<HTMLSelectElement>('#starships');
  const vehiclesElement = document.querySelector<HTMLSelectElement>('#vehicles');
  const planetsElement = document.querySelector<HTMLSelectElement>('#planets');

  if (
    titleElement === null ||
    сrawlElement === null ||
    producerElement === null ||
    directorElement === null ||
    releaseDateElement === null ||
    charactersElement === null ||
    speciesElement === null ||
    starshipsElement === null ||
    vehiclesElement === null ||
    planetsElement === null
  ) {
    throw new Error(ERROR_FORM_ELEMENTS_ARE_NULL);
  }

  return {
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
  };
}
