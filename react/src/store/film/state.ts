import { createEntityAdapter } from '@reduxjs/toolkit';
import { Film } from 'src/models/film';
import { StateData } from '../shared/StateData';

export const filmsAdapter = createEntityAdapter<Film>({
  selectId: film => film.id,
});

interface FilmStateData extends StateData {
  /** Active film id. */
  readonly activeId: Film['id'] | null;
}

export const initialState = filmsAdapter.getInitialState<FilmStateData>({
  loading: false,
  activeId: null,
});

export type FilmState = typeof initialState;
