import { getAllCharacters } from '../entities/character/fetch';
import { getConnectedFilm } from '../entities/connected-film';
import { createFilm } from '../entities/film';
import { updateFilm } from '../entities/film/fetch';
import { toDto } from '../entities/film/mappers';
import { getAllPlanets } from '../entities/planet/fetch';
import { getAllSpecies } from '../entities/species/fetch';
import { getAllStarships } from '../entities/starship/fetch';
import { getAllVehicles } from '../entities/vehicle/fetch';
import { subsrcibeToAuthChange } from '../firebase/auth';

import { fillForm } from './fill-form';
import { getForm } from './save-form';

/** Get id param. */
function getFilmId(): string | null {
  const params = new URLSearchParams(location.search);
  return params.get('id');
}

/**
 * Redirects to films pape.
 * @param id Id of the film.
 */
function redirectToFilm(id: string): void {
  location.href = `/film/?id=${id}`;
}

subsrcibeToAuthChange(async user => {
  if (user === null) {
    location.href = '/auth/login/';
  }

  const filmId = getFilmId();

  document.querySelector('.film-form')?.addEventListener('submit', async e => {
    e.preventDefault();

    const form = getForm();
    if (form === null) {
      return;
    }

    if (filmId === null) {
      const redirectFilmId = await createFilm(form);
      redirectToFilm(redirectFilmId);
    } else {
      await updateFilm(filmId, toDto(form));
      redirectToFilm(filmId);
    }
  });

  const cancelElement = document.querySelector('.film-form__cancel');

  if (filmId === null) {
    cancelElement?.remove();
    return;
  }

  document.querySelector('.film-form__cancel')?.addEventListener('click', () => redirectToFilm(filmId));

  const [
    connectedFilm,
    characters,
    planets,
    species,
    starships,
    vehicles,
  ] = await Promise.all([
    getConnectedFilm(filmId),
    getAllCharacters(),
    getAllPlanets(),
    getAllSpecies(),
    getAllStarships(),
    getAllVehicles(),
  ]);

  fillForm(connectedFilm, {
    characters,
    planets,
    species,
    starships,
    vehicles,
  });
});
