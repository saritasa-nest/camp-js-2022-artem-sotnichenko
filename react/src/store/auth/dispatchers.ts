import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'src/api/services/auth.service';

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  AuthService.signInWithGoogle,
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  AuthService.signOut,
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  AuthService.getUser,
);
