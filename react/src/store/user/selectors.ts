import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects user from store. */
export const selectUser = createSelector((state: RootState) => state.user.user, user => user);

/** Selects user authorization state. */
export const selectIsAuthorized = createSelector((state: RootState) => state.user.user, user => Boolean(user));
