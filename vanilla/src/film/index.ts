import { getFilmById } from '../entities/film';

import { displayFilm } from './display-film';

main();

/** Main function of the page. */
async function main(): Promise<void> {
  const params = new URLSearchParams(location.search);
  const filmId = params.get('id');

  if (filmId === null) {
    return;
  }

  const film = await getFilmById(filmId);
  displayFilm(film);
}
