import { Film } from 'src/models/film';
import { FilmForm } from 'src/models/filmForm';
import { FilmQueryField } from 'src/models/filmQueryField';
import { QueryDirection } from 'src/models/queryDirection';
import { FilmDocument } from '../dtos/film.dto';
import { filmMapper } from '../mappers/film.mapper';
import { filmFormMapper } from '../mappers/filmForm.mapper';
import { FirestoreService } from './firestore.service';
import { Query, QueryGetConstraintsOptions, QueryService } from './query.service';

export type FilmQuery = Query<FilmQueryField>;

const DEFAULT_QUERY = {
  searchText: '',
  field: FilmQueryField.Title,
  direction: QueryDirection.Ascending,
};

export namespace FilmService {
  /**
   * Fetch films.
   * @param options Options.
   */
  export async function fetchMany(options: Partial<QueryGetConstraintsOptions<FilmQueryField>>): Promise<Film[]> {
    const query = options.query ?? DEFAULT_QUERY;

    const constraints = await QueryService.getConstraints({ ...options, query });
    const filmDtos = await FirestoreService.fetchMany<FilmDocument>('films', constraints);
    return filmDtos.map(filmMapper.fromDto);
  }

  /**
   * Fetch film by id.
   * @param id Film id.
   */
  export async function fetchOne(id: Film['id']): Promise<Film> {
    const filmDto = await FirestoreService.fetchOne<FilmDocument>('films', id);
    return filmMapper.fromDto(filmDto);
  }

  /**
   * Create film.
   * @param filmForm Film form.
   */
  export async function create(filmForm: FilmForm): Promise<Film['id']> {
    const filmFormDto = filmFormMapper.toDto(filmForm);
    return FirestoreService.create('films', filmFormDto);
  }

  /**
   * Update film.
   * @param id Film id.
   * @param filmForm Film form.
   */
  export async function update(id: Film['id'], filmForm: FilmForm): Promise<void> {
    const filmFormDto = filmFormMapper.toDto(filmForm);
    return FirestoreService.update('films', id, filmFormDto);
  }
}
