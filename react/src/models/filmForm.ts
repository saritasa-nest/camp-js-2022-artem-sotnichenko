import { Film } from './film';

/** Film form model for updation and creation. */
export type FilmForm = Omit<Film, 'id'>;
