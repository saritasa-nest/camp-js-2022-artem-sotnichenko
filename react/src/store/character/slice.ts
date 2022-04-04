import {
  createSlice,
} from '@reduxjs/toolkit';
import { pendingReducer, rejectedReducer } from '../shared/reducers';
import {
  fetchCharactersByIds,
} from './dispatchers';
import {
  charactersAdapter, CharactersState, initialState,
} from './state';

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    clearCharacters(state) {
      charactersAdapter.removeAll(state as CharactersState);
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCharactersByIds.pending, pendingReducer)
      .addCase(fetchCharactersByIds.fulfilled, (state, action) => {
        charactersAdapter.setAll(state as CharactersState, action.payload);
        state.loading = false;
      })
      .addCase(fetchCharactersByIds.rejected, rejectedReducer);
  },
});

export const {
  clearCharacters,
} = charactersSlice.actions;
