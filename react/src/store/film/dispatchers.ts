import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmService } from 'src/api/services/film.service';
import type { RootState } from '../store';

export const fetchFilms = createAsyncThunk(
  'film/fetchFilms',
  (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    return FilmService.fetchFilms({ count: 10, filter: state.film.filter });
  },
);

export const fetchFilmsMore = createAsyncThunk(
  'film/fetchFilmsMore',
  (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { films } = state.film;
    const fetchAfter = films[films.length - 1].id;

    return FilmService.fetchFilms({ count: 5, fetchAfter, filter: state.film.filter });
  },
);
