import { Film } from './film';

/** Film form, used as creating, update data. */
export type FilmForm = Omit<Film, 'id'>;
