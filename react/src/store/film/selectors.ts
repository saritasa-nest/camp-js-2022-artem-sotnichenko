import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { filmsAdapter } from './state';

/** Film loading status. */
export const selectFilmLoading = createSelector((state: RootState) => state.films.loading, loading => loading);

export const {
  selectAll: selectAllFilms,
  selectById: selectFilmById,
  selectIds: selectFilmIds,
} = filmsAdapter.getSelectors<RootState>(state => state.films);
