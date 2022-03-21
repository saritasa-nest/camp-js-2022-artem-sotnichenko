import {
  IconButton, OutlinedInput, Tooltip,
} from '@mui/material';
import { Box } from '@mui/system';
import {
  ChangeEvent,
  memo, ReactElement, useEffect, useRef, useState, VFC,
} from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchFilms, fetchFilmsMore } from 'src/store/film/dispatchers';
import { selectAllFilms, selectFilter } from 'src/store/film/selectors';
import {
  Sort, Search,
} from '@mui/icons-material';
import { setSearchText, setSortDirection, setSortField } from 'src/store/film/slice';
import {
  SortDirection, SortField,
} from 'src/api/services/film.service';
import { FilmList } from '../../components/FilmList';

import cls from './FilmPage.module.css';
import { FilterSort } from '../../components/FilterSort';
import useIntersectionObserver from '../../hooks/use-intersection-observer';

const FilmsPageComponent: VFC = () => {
  const dispatch = useAppDispatch();

  const films = useAppSelector(selectAllFilms);
  const filter = useAppSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch, filter]);

  const fetchMore = (): void => { dispatch(fetchFilmsMore()); };

  const [filterType, setFilterType] = useState<'search' | 'sort' | null>(null);

  const searchText = 'searchText' in filter ? filter.searchText : '';
  const handleSearchTextChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    dispatch(setSearchText(e.target.value));
  };

  const sortField = 'sortField' in filter ? filter.sortField : SortField.Title;
  const handleSortFieldChange = (field: SortField): void => { dispatch(setSortField(field)); };

  const sortDirection = 'sortDirection' in filter ? filter.sortDirection : SortDirection.Ascending;
  const handleSortDirectionChange = (field: SortDirection): void => { dispatch(setSortDirection(field)); };

  const isFilterBlockVisible = filterType != null;
  const getFilterBlock = (): ReactElement | null => {
    if (filterType === 'search') {
      return (
        <OutlinedInput
          className={cls['search-input']}
          placeholder="Search"
          value={searchText}
          onChange={e => handleSearchTextChange(e)}
        />
      );
    }
    if (filterType === 'sort') {
      return (
        <FilterSort
          selectedSortField={sortField}
          selectedSortDirection={sortDirection}
          onSortFieldChange={field => handleSortFieldChange(field)}
          onSortDirectionChange={direction => handleSortDirectionChange(direction)}
        />
      );
    }
    return null;
  };

  /** Handle sort button click. */
  function handleSortClick(): void {
    setFilterType(filterType === 'sort' ? null : 'sort');
  }
  /** Handle search button click. */
  function handleSearchClick(): void {
    setFilterType(filterType === 'search' ? null : 'search');
  }

  const endOfListRef = useRef<HTMLDivElement | null>(null);
  const intersectionObserverEntry = useIntersectionObserver(endOfListRef, {});

  useEffect(() => {
    if (films.length !== 0 && intersectionObserverEntry?.isIntersecting) {
      fetchMore();
    }
  }, [intersectionObserverEntry]);

  return (
    <div className={cls.films}>
      <aside className={cls.sidebar}>
        <div className={cls.header}>
          <div className={cls.options}>
            <div>Films</div>
            <div className={cls.buttons}>
              <Tooltip title="Sort">
                <IconButton size="small" onClick={() => handleSortClick()}>
                  <Sort fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Search">
                <IconButton size="small" onClick={() => handleSearchClick()}>
                  <Search fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          {isFilterBlockVisible && (
          <div className={cls.filter}>
            {getFilterBlock()}
          </div>
          )}
        </div>
        <div
          className={cls.list}
        >
          <FilmList films={films} />
          <div ref={endOfListRef} />
        </div>
      </aside>
      <Box>
        film placeholder
      </Box>
    </div>
  );
};

export const FilmsPage = memo(FilmsPageComponent);
