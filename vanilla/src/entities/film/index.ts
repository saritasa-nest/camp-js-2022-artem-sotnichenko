import { fetchFilmsAfterId, FetchFilmsAfterIdOptions, fetchFilmsBeforeId, FetchFilmsBeforeIdOptions } from './fetch';
import { fromDto } from './mappers';
import { Film } from './types';

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
