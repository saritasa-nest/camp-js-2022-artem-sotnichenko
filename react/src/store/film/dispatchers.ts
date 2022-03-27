import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmService } from 'src/api/services/film.service';
import { Film } from 'src/models/film';
import { FilmForm } from 'src/models/filmForm';

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  FilmService.fetchMany,
);

export const fetchFilm = createAsyncThunk(
  'films/fetchFilm',
  FilmService.fetchOne,
);

export const createFilm = createAsyncThunk(
  'films/createFilm',
  async (filmForm: FilmForm) => {
    const filmId = await FilmService.create(filmForm);
    return FilmService.fetchOne(filmId);
  },
);

export const updateFilm = createAsyncThunk(
  'films/updateFilm',
  async ({ id, filmForm }: { id: Film['id']; filmForm: FilmForm; }) => {
    await FilmService.update(id, filmForm);
    return FilmService.fetchOne(id);
  },
);
