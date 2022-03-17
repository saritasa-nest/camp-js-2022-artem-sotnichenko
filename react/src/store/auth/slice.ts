import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/models/user';
import { signInWithGoogle } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => builder
    .addCase(signInWithGoogle.pending, state => {
      state.loading = true;
    })
    .addCase(signInWithGoogle.fulfilled, state => {
      state.loading = false;
    })
    .addCase(signInWithGoogle.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.loading = false;
    }),
});

export const { setUser, setLoading } = authSlice.actions;
