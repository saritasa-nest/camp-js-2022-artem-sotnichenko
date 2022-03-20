import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects films. */
export const selectFilms = createSelector((state: RootState) => state.film.films, films => films);

/** Selects filter. */
export const selectFilter = createSelector((state: RootState) => state.film.filter, filter => filter);
