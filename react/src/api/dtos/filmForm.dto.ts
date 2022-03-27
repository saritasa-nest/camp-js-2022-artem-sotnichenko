import { FilmDto } from './film.dto';

/** Film form DTO for updation and creation. */
export type FilmFormDto = Omit<FilmDto, 'id'>;
