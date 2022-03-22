import {
  CircularProgress,
  IconButton, OutlinedInput, Tooltip,
} from '@mui/material';
import { Box } from '@mui/system';
import {
  memo, ReactElement, useCallback, useEffect, useRef, useState, VFC,
} from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchFilms, fetchFilmsOnTop } from 'src/store/film/dispatchers';
import { selectAllFilms, selectStatus } from 'src/store/film/selectors';
import {
  Sort, Search,
} from '@mui/icons-material';
import {
  FilmService,
  SortDirection, SortField,
} from 'src/api/services/film.service';
import { clearFilms } from 'src/store/film/slice';
import { FilmList } from '../../components/FilmList';

import cls from './FilmPage.module.css';
import { FilterSort } from '../../components/FilterSort';
import { useIntersectionObserver } from '../../hooks/use-intersection-observer';

const FilmsPageComponent: VFC = () => {
  const dispatch = useAppDispatch();

  const films = useAppSelector(selectAllFilms);
  const filmStatus = useAppSelector(selectStatus);

  const [filterType, setFilterType] = useState<'search' | 'sort' | null>(null);
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState(SortField.Title);
  const [sortDirection, setSortDirection] = useState(SortDirection.Ascending);

  const getFilter = useCallback((): FilmService.Filter | undefined => {
    if (filterType === 'search') {
      return { searchText };
    }
    if (filterType === 'sort') {
      return { sortField, sortDirection };
    }
    return undefined;
  }, [filterType, searchText, sortField, sortDirection]);

  const currentFetchAfterId = films.at(-1)?.id ?? undefined;

  useEffect(() => {
    dispatch(clearFilms());
    if (filmStatus !== 'loading') {
      dispatch(fetchFilms({
        count: 5,
        filter: getFilter(),
      }));
    }
  }, [getFilter]);

  const endOfListRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(endOfListRef, {});
  const isBottomVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isBottomVisible && filmStatus !== 'loading') {
      dispatch(fetchFilmsOnTop({
        count: 5,
        filter: getFilter(),
        fetchAfter: currentFetchAfterId,
      }));
    }
  }, [isBottomVisible, currentFetchAfterId]);

  /** Handle sort button click. */
  const handleSortClick = (): void => {
    setFilterType(filterType === 'sort' ? null : 'sort');
  };
  /** Handle search button click. */
  const handleSearchClick = (): void => {
    setFilterType(filterType === 'search' ? null : 'search');
  };

  const isFilterBlockVisible = filterType != null;

  /** Shows one of filters. */
  function getFilterBlock(): ReactElement | null {
    if (filterType === 'search') {
      return (
        <OutlinedInput
          className={cls['search-input']}
          placeholder="Search"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      );
    }
    if (filterType === 'sort') {
      return (
        <FilterSort
          selectedSortField={sortField}
          selectedSortDirection={sortDirection}
          onSortFieldChange={field => setSortField(field)}
          onSortDirectionChange={direction => setSortDirection(direction)}
        />
      );
    }
    return null;
  }

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
          {filmStatus === 'loading' && <CircularProgress />}
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
