import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmService } from 'src/api/services/film.service';

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  FilmService.fetchMany,
);

export const fetchFilmsOnTop = createAsyncThunk(
  'films/fetchFilmsOnTop',
  FilmService.fetchMany,
);

export const fetchFilm = createAsyncThunk(
  'films/fetchFilm',
  FilmService.fetchOne,
);
