import { CaseReducer, createSlice } from '@reduxjs/toolkit';
import { fetchUser, signInWithGoogle, signOut } from './dispatchers';
import { AuthState, initialState } from './state';

const pendingReducer: CaseReducer<AuthState> = state => {
  state.loading = true;
};

const rejectedReducer: CaseReducer<AuthState> = (state, action) => {
  if (action.error.message) {
    state.error = action.error.message;
  }
  state.loading = false;
};

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
