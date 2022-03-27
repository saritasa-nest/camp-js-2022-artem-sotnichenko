import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Film } from 'src/models/film';
import { pendingReducer, rejectedReducer } from '../shared/reducers';
import {
  createFilm,
  fetchFilm,
  fetchFilms,
} from './dispatchers';
import {
  filmsAdapter, FilmState, initialState,
} from './state';

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    clearFilms(state) {
      filmsAdapter.removeMany(state as FilmState, state.ids.filter(id => id !== state.activeId));
      state.loading = false;
    },
    setActiveFilm(state, action: PayloadAction<Film['id'] | null>) {
      state.activeId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilms.pending, pendingReducer)
      .addCase(fetchFilms.fulfilled, (state, action) => {
        filmsAdapter.upsertMany(state as FilmState, action.payload);
        state.loading = false;
      })
      .addCase(fetchFilms.rejected, rejectedReducer)
      .addCase(fetchFilm.pending, pendingReducer)
      .addCase(fetchFilm.fulfilled, (state, action) => {
        filmsAdapter.upsertOne(state as FilmState, action.payload);
        state.loading = false;
      })
      .addCase(fetchFilm.rejected, rejectedReducer)
      .addCase(createFilm.pending, pendingReducer)
      .addCase(createFilm.fulfilled, (state, action) => {
        filmsAdapter.upsertOne(state as FilmState, action.payload);
        state.loading = false;
      })
      .addCase(createFilm.rejected, rejectedReducer);
  },
});

export const {
  clearFilms,
  setActiveFilm,
} = filmsSlice.actions;
