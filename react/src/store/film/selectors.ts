import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { filmsAdapter } from './state';

/** Selects films fetching status. */
export const selectFilmStatus = createSelector((state: RootState) => state.films.status, status => status);

export const {
  selectAll: selectAllFilms,
  selectById: selectFilmById,
  selectIds: selectFilmIds,
} = filmsAdapter.getSelectors<RootState>(state => state.films);
