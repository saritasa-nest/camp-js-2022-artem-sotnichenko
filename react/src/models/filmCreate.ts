import { Film } from './film';

/** Film create model. */
export type FilmCreate = Omit<Film, 'id'>;
