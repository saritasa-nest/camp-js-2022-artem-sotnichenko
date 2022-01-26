import { fetchFilms } from './fetch';
import { toModel } from './mappers';
import { Film } from './types';

/** Get all films. */
export async function getFilms(): Promise<Film[]> {
  const films = await fetchFilms();
  return films.map(toModel);
}
