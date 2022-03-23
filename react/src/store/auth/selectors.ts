import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects user from store. */
export const selectUser = createSelector((state: RootState) => state.auth.user, user => user);

/** Selects user authorization state. */
export const selectIsAuthorized = createSelector((state: RootState) => state.auth.user, user => Boolean(user));

/** Selects user authorization state. */
export const selectAuthLoading = createSelector((state: RootState) => state.auth.loading, loading => loading);
