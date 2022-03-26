import { createSelector } from '@reduxjs/toolkit';
import { Planet } from 'src/models/planet';
import { RootState } from '../store';
import { planetsAdapter } from './state';

/** Planet loading status. */
export const selectPlanetLoading = createSelector((state: RootState) => state.planets.loading, loading => loading);

/** Planet loading status. */
export const selectPlanetsByIds = createSelector(
  (state: RootState, ids: readonly Planet['id'][]) => ids
    .map(id => state.planets.entities[id])
    .filter((entity): entity is Planet => entity != null),
  entities => entities,
);

export const {
  selectAll: selectAllPlanets,
  selectIds: selectPlanetIds,
} = planetsAdapter.getSelectors<RootState>(state => state.planets);
