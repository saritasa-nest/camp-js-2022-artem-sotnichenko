import { createAsyncThunk } from '@reduxjs/toolkit';
import { CharacterService } from 'src/api/services/character.service';

export const fetchCharactersByIds = createAsyncThunk(
  'characters/fetchCharactersByIds',
  CharacterService.fetchCharactersByIds,
);
