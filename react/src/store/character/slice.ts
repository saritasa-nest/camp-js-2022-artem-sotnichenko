import {
  createSlice,
} from '@reduxjs/toolkit';
import { pendingReducer, rejectedReducer } from '../shared/reducers';
import {
  fetchAllCharacters,
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
        charactersAdapter.upsertMany(state as CharactersState, action.payload);
        state.loading = false;
      })
      .addCase(fetchCharactersByIds.rejected, rejectedReducer)
      .addCase(fetchAllCharacters.pending, pendingReducer)
      .addCase(fetchAllCharacters.fulfilled, (state, action) => {
        charactersAdapter.upsertMany(state as CharactersState, action.payload);
        state.loading = false;
      })
      .addCase(fetchAllCharacters.rejected, rejectedReducer);
  },
});

export const {
  clearCharacters,
} = charactersSlice.actions;
