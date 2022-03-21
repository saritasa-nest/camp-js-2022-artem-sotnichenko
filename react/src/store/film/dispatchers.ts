import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmService } from 'src/api/services/film.service';

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  FilmService.fetchFilms,
);

export const fetchFilmsOnTop = createAsyncThunk(
  'films/fetchFilmsOnTop',
  FilmService.fetchFilms,
);
