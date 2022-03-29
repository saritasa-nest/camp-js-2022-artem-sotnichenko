import { FilmDto } from './film.dto';

/** Film create DTO. */
export type FilmCreateDto = Omit<FilmDto, 'id'>;
