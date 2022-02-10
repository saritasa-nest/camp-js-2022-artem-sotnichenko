import {
  fetchFilmById,
  fetchFilmsAfterId,
  FetchFilmsAfterIdOptions,
  fetchFilmsBeforeId,
  FetchFilmsBeforeIdOptions,
  createFilm as createFilmFromDto,
} from './fetch';
import { fromDto, toDto } from './mappers';
import { Film } from './types';

/**
 * Get film model by id.
 * @param id Film id.
 */
export async function getFilmById(id: string): Promise<Film> {
  const film = await fetchFilmById(id);
  return fromDto(film);
}

/**
 * Get film models before film by id.
 * @param options Options.
 */
export async function getFilmsAfterId(options: FetchFilmsAfterIdOptions): Promise<Film[]> {
  const films = await fetchFilmsAfterId(options);
  return films.map(fromDto);
}

/**
 * Get film models after film by id.
 * @param options Options.
 */
export async function getFilmsBeforeId(options: FetchFilmsBeforeIdOptions): Promise<Film[]> {
  const films = await fetchFilmsBeforeId(options);
  return films.map(fromDto);
}

/**
 * Create film.
 * @param film Film model.
 * @returns Id of created film.
 */
export function createFilm(film: Film): Promise<string> {
  return createFilmFromDto(toDto(film));
}
