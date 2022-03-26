import { createEntityAdapter } from '@reduxjs/toolkit';
import { Planet } from 'src/models/planet';
import { StateData } from '../shared/StateData';

export const planetsAdapter = createEntityAdapter<Planet>({
  selectId: planet => planet.id,
});

export const initialState = planetsAdapter.getInitialState<StateData>({
  loading: true,
});

export type PlanetsState = typeof initialState;
