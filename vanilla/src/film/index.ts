import { getConnectedFilm } from '../entities/connected-film';
import { subsrcibeToAuthChange } from '../firebase/auth';

import { deleteFilm } from './delete-film';

import { displayFilm } from './display-film';

subsrcibeToAuthChange(async user => {
  if (user === null) {
    location.href = '/auth/login/';
  }

  const params = new URLSearchParams(location.search);
  const filmId = params.get('id');

  if (filmId === null) {
    return;
  }

  const connectedFilm = await getConnectedFilm(filmId);
  displayFilm(connectedFilm);

  document.querySelector('.film__delete')?.addEventListener('click', () => deleteFilm(filmId));
  document.querySelector('.film__change')?.setAttribute('href', `/film-form/?id=${filmId}`);
});
