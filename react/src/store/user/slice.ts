import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/models/user';
import { initialState } from './state';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = null;
    },
  },
});

export const { saveUser } = userSlice.actions;
export const { removeUser } = userSlice.actions;
