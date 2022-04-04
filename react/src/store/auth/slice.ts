import { createSlice } from '@reduxjs/toolkit';
import { pendingReducer, rejectedReducer } from '../shared/reducers';
import { fetchUser, signInWithGoogle, signOut } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: builder => builder
    .addCase(signInWithGoogle.pending, pendingReducer)
    .addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase(signInWithGoogle.rejected, rejectedReducer)
    .addCase(signOut.pending, pendingReducer)
    .addCase(signOut.fulfilled, state => {
      state.user = null;
      state.loading = false;
    })
    .addCase(signOut.rejected, rejectedReducer)
    .addCase(fetchUser.pending, pendingReducer)
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase(fetchUser.rejected, rejectedReducer),
});
