import { getConnectedFilm } from '../entities/connected-film';
import { getFilmById } from '../entities/film';
import { subsrcibeToAuthChange } from '../firebase/auth';

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
});