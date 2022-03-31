import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { filmsAdapter } from './state';

export const {
  selectAll: selectAllFilms,
  selectById: selectFilmById,
  selectIds: selectFilmIds,
} = filmsAdapter.getSelectors<RootState>(state => state.films);

/** Film loading status. */
export const selectFilmLoading = createSelector((state: RootState) => state.films.loading, loading => loading);

/** Current active film id. */
export const selectActiveFilmId = createSelector((state: RootState) => state.films.activeId, activeId => activeId);

/** Current active film id. */
export const selectFilteredFilms = createSelector(
  [selectAllFilms, selectActiveFilmId],
  (films, activeFilmId) => {
    const activeFilm = films.find(film => film.id === activeFilmId);
    const inactiveFilms = films.filter(film => film.id !== activeFilmId);
    return activeFilm != null ? [activeFilm, ...inactiveFilms] : inactiveFilms;
  },
);
