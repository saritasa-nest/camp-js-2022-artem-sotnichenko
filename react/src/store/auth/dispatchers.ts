import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'src/api/services/auth.service';

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  () => AuthService.signInWithGoogle(),
);
