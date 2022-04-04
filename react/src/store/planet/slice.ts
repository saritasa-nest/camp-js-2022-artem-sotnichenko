import {
  createSlice,
} from '@reduxjs/toolkit';
import { pendingReducer, rejectedReducer } from '../shared/reducers';
import {
  fetchPlanetsByIds,
} from './dispatchers';
import {
  planetsAdapter, PlanetsState, initialState,
} from './state';

export const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    clearPlanets(state) {
      planetsAdapter.removeAll(state as PlanetsState);
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPlanetsByIds.pending, pendingReducer)
      .addCase(fetchPlanetsByIds.fulfilled, (state, action) => {
        planetsAdapter.setAll(state as PlanetsState, action.payload);
        state.loading = false;
      })
      .addCase(fetchPlanetsByIds.rejected, rejectedReducer);
  },
});

export const {
  clearPlanets,
} = planetsSlice.actions;
