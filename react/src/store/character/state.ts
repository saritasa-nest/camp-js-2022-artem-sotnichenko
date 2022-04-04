import { createEntityAdapter } from '@reduxjs/toolkit';
import { Character } from 'src/models/character';
import { StateData } from '../shared/StateData';

export const charactersAdapter = createEntityAdapter<Character>({
  selectId: character => character.id,
});

export const initialState = charactersAdapter.getInitialState<StateData>({
  loading: true,
});

export type CharactersState = typeof initialState;
