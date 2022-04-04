import { createSelector } from '@reduxjs/toolkit';
import { Character } from 'src/models/character';
import { isNotNullish } from 'src/utils/isNotNullish';
import { RootState } from '../store';
import { charactersAdapter } from './state';

/** Character loading status. */
export const selectCharacterLoading = createSelector(
  (state: RootState) => state.characters.loading,
  loading => loading,
);

/** Character loading status. */
export const selectCharactersByIds = createSelector(
  (state: RootState, ids: readonly Character['id'][]) => ids
    .map(id => state.characters.entities[id])
    .filter(isNotNullish),
  entities => entities,
);

export const {
  selectAll: selectAllCharacters,
  selectIds: selectCharacterIds,
} = charactersAdapter.getSelectors<RootState>(state => state.characters);
