import { createSlice } from '@reduxjs/toolkit';
import { pendingReducer, rejectedReducer } from '../shared/reducers';
import {
  fetchFilms,
  fetchFilmsOnTop,
} from './dispatchers';
import {
  filmsAdapter, FilmState, initialState,
} from './state';

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    clearFilms(state) {
      filmsAdapter.removeAll(state as FilmState);
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilms.pending, pendingReducer)
      .addCase(fetchFilms.fulfilled, (state, action) => {
        filmsAdapter.setAll(state as FilmState, action.payload);
        state.loading = false;
      })
      .addCase(fetchFilms.rejected, rejectedReducer)
      .addCase(fetchFilmsOnTop.pending, pendingReducer)
      .addCase(fetchFilmsOnTop.fulfilled, (state, action) => {
        filmsAdapter.upsertMany(state as FilmState, action.payload);
        state.loading = false;
      })
      .addCase(fetchFilmsOnTop.rejected, rejectedReducer);
  },
});

export const {
  clearFilms,
} = filmsSlice.actions;
