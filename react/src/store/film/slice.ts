import {
  CaseReducer,
  createSlice,
} from '@reduxjs/toolkit';
import {
  fetchFilms,
  fetchFilmsOnTop,
} from './dispatchers';
import {
  filmsAdapter, InitialState, initialState,
} from './state';

const loadingReducer: CaseReducer<InitialState> = state => {
  state.status = 'loading';
};

const rejectionReducer: CaseReducer<InitialState> = (state, action) => {
  if (action.error.message) {
    state.error = action.error.message;
  }
  state.status = 'failed';
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    clearFilms(state) {
      filmsAdapter.removeAll(state as InitialState);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilms.pending, loadingReducer)
      .addCase(fetchFilms.fulfilled, (state, action) => {
        filmsAdapter.setAll(state as InitialState, action.payload);
        state.status = 'succeeded';
      })
      .addCase(fetchFilms.rejected, rejectionReducer)
      .addCase(fetchFilmsOnTop.pending, loadingReducer)
      .addCase(fetchFilmsOnTop.fulfilled, (state, action) => {
        filmsAdapter.upsertMany(state as InitialState, action.payload);
        state.status = 'succeeded';
      })
      .addCase(fetchFilmsOnTop.rejected, rejectionReducer);
  },
});

export const {
  clearFilms,
} = filmsSlice.actions;
