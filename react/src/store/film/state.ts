import { createEntityAdapter } from '@reduxjs/toolkit';
import { FilmService, SortDirection, SortField } from 'src/api/services/film.service';
import { Film } from 'src/models/film';
import { StateData } from '../state-data';

/**
 * Films state.
 */
export interface FilmState extends StateData {

  /** Filter, sort and search are exclusive. */
  readonly filter: FilmService.Filter;

  /** Id to fetch after, used for infinite scroll. */
  readonly fetchAfterId: Film['id'] | null;
}

export const filmsAdapter = createEntityAdapter<Film>({
  selectId: film => film.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const initialState = filmsAdapter.getInitialState<FilmState>({
  filter: {
    sortField: SortField.Title,
    sortDirection: SortDirection.Ascending,
  },
  fetchAfterId: null,
  status: 'idle',
  error: null,
});

export type InitialState = typeof initialState;

console.log(initialState);

// export const initialState: FilmState = {
//   films: [],
//   loading: true,
//   filter: {
//     sortField: SortField.Title,
//     sortDirection: SortDirection.Ascending,
//   },
// };
