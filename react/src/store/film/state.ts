import { createEntityAdapter } from '@reduxjs/toolkit';
import { Film } from 'src/models/film';
import { StateData } from '../shared/StateData';

export const filmsAdapter = createEntityAdapter<Film>({
  selectId: film => film.id,
});

export const initialState = filmsAdapter.getInitialState<StateData>({
  loading: false,
});

export type FilmState = typeof initialState;
