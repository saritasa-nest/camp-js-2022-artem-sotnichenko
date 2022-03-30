import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { filmsAdapter } from './state';

/** Film loading status. */
export const selectFilmLoading = createSelector((state: RootState) => state.films.loading, loading => loading);

/** Current active film id. */
export const selectActiveFilmId = createSelector((state: RootState) => state.films.activeId, activeId => activeId);

export const {
  selectAll: selectAllFilms,
  selectById: selectFilmById,
  selectIds: selectFilmIds,
} = filmsAdapter.getSelectors<RootState>(state => state.films);
