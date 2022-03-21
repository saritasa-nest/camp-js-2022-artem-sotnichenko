import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { filmsAdapter } from './state';

/** Selects filter. */
export const selectFilter = createSelector((state: RootState) => state.film.filter, filter => filter);

export const {
  selectAll: selectAllFilms,
  selectById: selectFilmById,
  selectIds: selectFilmIds,
} = filmsAdapter.getSelectors<RootState>(state => state.film);
