import { Film } from 'src/models/film';
import { FilmCreate } from 'src/models/filmCreate';
import { FilmQueryField } from 'src/models/filmQueryField';
import { FilmUpdate } from 'src/models/filmUpdate';
import { QueryDirection } from 'src/models/queryDirection';
import { FilmDocument } from '../dtos/film.dto';
import { filmMapper } from '../mappers/film.mapper';
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
   * @param film Film form.
   */
  export async function create(film: FilmCreate): Promise<Film['id']> {
    const filmCreateDto = filmMapper.createDataToDto(film);
    return FirestoreService.create('films', filmCreateDto);
  }

  /**
   * Update film.
   * @param id Film id.
   * @param film Film form.
   */
  export async function update(id: Film['id'], film: FilmUpdate): Promise<Film['id']> {
    const filmUpdateDto = filmMapper.updateDataToDto(film);
    return FirestoreService.update('films', id, filmUpdateDto);
  }

  /**
   * Remove film.
   * @param id Film id.
   */
  export async function remove(id: Film['id']): Promise<Film['id']> {
    return FirestoreService.remove('films', id);
  }
}
