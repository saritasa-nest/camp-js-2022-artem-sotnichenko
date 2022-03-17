import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/models/user';
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
});

export const { setUser } = authSlice.actions;
export const { setLoading } = authSlice.actions;
