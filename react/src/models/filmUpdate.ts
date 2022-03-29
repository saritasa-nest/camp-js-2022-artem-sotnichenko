import { Film } from './film';

/** Film update model. */
export type FilmUpdate = Omit<Film, 'id'>;
