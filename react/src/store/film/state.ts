import { FilmService, SortDirection, SortField } from 'src/api/services/film.service';
import { Film } from 'src/models/film';

/**
 * Films state.
 */
export interface FilmState {
  /** Films. */
  readonly films: Film[];

  /** Filter, sort and search are exclusive. */
  readonly filter: FilmService.Filter;

  /** Error. */
  readonly error?: string;

  /** Loading. */
  readonly loading: boolean;
}

export const initialState: FilmState = {
  films: [],
  loading: true,
  filter: {
    sortField: SortField.Title,
    sortDirection: SortDirection.Ascending,
  },
};
