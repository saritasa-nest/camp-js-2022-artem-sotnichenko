import { createEntityAdapter } from '@reduxjs/toolkit';
import { Film } from 'src/models/film';
import { StateData } from '../state-data';

export const filmsAdapter = createEntityAdapter<Film>({
  selectId: film => film.id,
});

export const initialState = filmsAdapter.getInitialState<StateData>({
  status: 'idle',
  error: null,
});

export type InitialState = typeof initialState;
