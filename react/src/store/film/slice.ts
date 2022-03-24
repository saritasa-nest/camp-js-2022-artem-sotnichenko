import {
  CaseReducer,
  createSlice,
} from '@reduxjs/toolkit';
import {
  fetchFilms,
  fetchFilmsOnTop,
} from './dispatchers';
import {
  filmsAdapter, FilmState, initialState,
} from './state';

const loadingReducer: CaseReducer<FilmState> = state => {
  state.loading = true;
};

const rejectionReducer: CaseReducer<FilmState> = (state, action) => {
  if (action.error.message) {
    state.error = action.error.message;
  }
  state.loading = false;
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    clearFilms(state) {
      filmsAdapter.removeAll(state as FilmState);
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilms.pending, loadingReducer)
      .addCase(fetchFilms.fulfilled, (state, action) => {
        filmsAdapter.setAll(state as FilmState, action.payload);
        state.loading = false;
      })
      .addCase(fetchFilms.rejected, rejectionReducer)
      .addCase(fetchFilmsOnTop.pending, loadingReducer)
      .addCase(fetchFilmsOnTop.fulfilled, (state, action) => {
        filmsAdapter.upsertMany(state as FilmState, action.payload);
        state.loading = false;
      })
      .addCase(fetchFilmsOnTop.rejected, rejectionReducer);
  },
});

export const {
  clearFilms,
} = filmsSlice.actions;
