import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlanetService } from 'src/api/services/planet.service';

export const fetchPlanetsByIds = createAsyncThunk(
  'planets/fetchPlanetsByIds',
  PlanetService.fetchPlanetsByIds,
);