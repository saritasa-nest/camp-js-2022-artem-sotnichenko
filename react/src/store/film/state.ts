import { createEntityAdapter } from '@reduxjs/toolkit';
import { Film } from 'src/models/film';

export const filmsAdapter = createEntityAdapter<Film>({
  selectId: film => film.id,
});

/** Film store state. */
export interface FilmStateData {

  /** Error. */
  readonly error?: string;

  /** Loading. */
  readonly loading: boolean;
}

export const initialState = filmsAdapter.getInitialState<FilmStateData>({
  loading: false,
});

export type FilmState = typeof initialState;
