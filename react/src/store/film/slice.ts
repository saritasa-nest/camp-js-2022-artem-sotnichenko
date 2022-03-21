import {
  createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { FilmService, SortDirection, SortField } from 'src/api/services/film.service';
import {
  fetchFilms,
  fetchFilmsMore,
} from './dispatchers';
import {
  filmsAdapter, InitialState, initialState,
} from './state';

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<FilmService.FilterSearch['searchText']>) {
      state.filter = { searchText: action.payload };
    },
    setSort(state, action: PayloadAction<FilmService.FilterSort>) {
      state.filter = action.payload;
    },
    setSortField(state, action: PayloadAction<FilmService.FilterSort['sortField']>) {
      state.filter = {
        sortField: action.payload,
        sortDirection: 'sortDirection' in state.filter ? state.filter.sortDirection : SortDirection.Ascending,
      };
    },
    setSortDirection(state, action: PayloadAction<FilmService.FilterSort['sortDirection']>) {
      state.filter = {
        sortField: 'sortField' in state.filter ? state.filter.sortField : SortField.Title,
        sortDirection: action.payload,
      };
    },
    clearFilter(state) {
      state.filter = {
        sortField: SortField.Title,
        sortDirection: SortDirection.Ascending,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilms.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        const films = action.payload;
        filmsAdapter.setAll(state as InitialState, films);
        state.fetchAfterId = films.at(-1)?.id ?? null;

        state.status = 'succeeded';
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        if (action.error.message) {
          state.error = action.error.message;
        }
        state.status = 'failed';
      })
      .addCase(fetchFilmsMore.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchFilmsMore.fulfilled, (state, action) => {
        const films = action.payload;
        filmsAdapter.upsertMany(state as InitialState, films);
        state.fetchAfterId = films.at(-1)?.id ?? null;

        state.status = 'succeeded';
      })
      .addCase(fetchFilmsMore.rejected, (state, action) => {
        if (action.error.message) {
          state.error = action.error.message;
        }
        state.status = 'failed';
      });
  },
});

export const {
  setSearchText,
  setSort,
  setSortField,
  setSortDirection,
  clearFilter,
} = filmSlice.actions;
