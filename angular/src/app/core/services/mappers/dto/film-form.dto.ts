import { FilmDto } from './film.dto';

/** Film form, used as creating, update data. */
export type FilmFormDto = Omit<FilmDto, 'id'>;
