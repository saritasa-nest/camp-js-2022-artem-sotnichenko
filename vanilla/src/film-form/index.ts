import { getAllCharacters } from '../entities/character/fetch';
import { CharacterDto } from '../entities/character/types';
import { getConnectedFilm } from '../entities/connected-film';
import { getAllPlanets } from '../entities/planet/fetch';
import { getAllSpecies } from '../entities/species/fetch';
import { getAllStarships } from '../entities/starship/fetch';
import { getAllVehicles } from '../entities/vehicle/fetch';
import { subsrcibeToAuthChange } from '../firebase/auth';

import { deleteFilm } from './delete-film';

import { displayFilm } from './display-film';
import { fillForm } from './fill-form';

subsrcibeToAuthChange(async user => {
  if (user === null) {
    location.href = '/auth/login/';
  }

  const params = new URLSearchParams(location.search);
  const filmId = params.get('id');

  if (filmId === null) {
    return;
  }

  const [
    connectedFilm,

    //   characters,
  //   planets,
  //   species,
  //   starships,
  //   vehicles,
  ] = await Promise.all([
    getConnectedFilm(filmId),

    //   getAllCharacters(),

  //   getAllPlanets(),
  //   getAllSpecies(),
  //   getAllStarships(),
  //   getAllVehicles(),
  ]);

  fillForm(connectedFilm, {
    characters,
    planets,
    species,
    starships,
    vehicles,
  });

  // document.querySelector('.film__delete')?.addEventListener('click', () => deleteFilm(filmId));
});
