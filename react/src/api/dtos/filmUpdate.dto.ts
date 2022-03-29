import { FilmDto } from './film.dto';

/** Film update DTO. */
export type FilmUpdateDto = Omit<FilmDto, 'id'>;
