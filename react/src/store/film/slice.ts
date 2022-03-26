import { createSlice } from '@reduxjs/toolkit';
import { pendingReducer, rejectedReducer } from '../shared/reducers';
import {
  fetchFilm,
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
      .addCase(fetchFilm.rejected, rejectedReducer)
      .addCase(fetchFilm.pending, pendingReducer)
      .addCase(fetchFilm.fulfilled, (state, action) => {
        filmsAdapter.upsertOne(state as FilmState, action.payload);
        state.loading = false;
      })
      .addCase(fetchFilmsOnTop.rejected, rejectedReducer);
  },
});

export const {
  clearFilms,
} = filmsSlice.actions;
