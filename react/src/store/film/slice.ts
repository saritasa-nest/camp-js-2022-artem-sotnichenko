import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmService, SortDirection, SortField } from 'src/api/services/film.service';
import {
  fetchFilms,
  fetchFilmsMore,
} from './dispatchers';
import { initialState } from './state';

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
        state.loading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.loading = false;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        if (action.error.message) {
          state.error = action.error.message;
        }
        state.loading = false;
      })
      .addCase(fetchFilmsMore.pending, state => {
        state.loading = true;
      })
      .addCase(fetchFilmsMore.fulfilled, (state, action) => {
        state.films = [...state.films, ...action.payload];
        state.loading = false;
      })
      .addCase(fetchFilmsMore.rejected, (state, action) => {
        if (action.error.message) {
          state.error = action.error.message;
        }
        state.loading = false;
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
