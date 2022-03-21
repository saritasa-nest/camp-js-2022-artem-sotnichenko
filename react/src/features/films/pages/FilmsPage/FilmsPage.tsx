import {
  IconButton, OutlinedInput, Tooltip,
} from '@mui/material';
import { Box } from '@mui/system';
import {
  memo, ReactElement, useEffect, useRef, useState, VFC,
} from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchFilmsOnTop } from 'src/store/film/dispatchers';
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
import useIntersectionObserver from '../../hooks/use-intersection-observer';

const FilmsPageComponent: VFC = () => {
  const dispatch = useAppDispatch();

  const films = useAppSelector(selectAllFilms);

  const [filterType, setFilterType] = useState<'search' | 'sort' | null>(null);
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState(SortField.Title);
  const [sortDirection, setSortDirection] = useState(SortDirection.Ascending);

  /**
   * Get filter to fetch films with.
   */
  function getFilter(): FilmService.Filter | undefined {
    if (filterType === 'search') {
      return { searchText };
    }
    if (filterType === 'sort') {
      return { sortField, sortDirection };
    }
    return undefined;
  }

  const currentFilter = getFilter();
  const currentFetchAfterId = films.at(-1)?.id ?? undefined;

  const endOfListRef = useRef<HTMLDivElement | null>(null);
  const intersectionObserverEntry = useIntersectionObserver(endOfListRef, {});

  const isBottomVisible = intersectionObserverEntry?.isIntersecting ?? false;

  const filmStatus = useAppSelector(selectStatus);

  /**
   * TODO: Add clear on filter change.
   */
  // useEffect(() => {
  //   console.log(currentFilter);
  //   if (films.length !== 0 && filmStatus !== 'loading') {
  //     dispatch(clearFilms());
  //   }
  // }, [filterType]);

  useEffect(() => {
    if ((filmStatus === 'idle' || isBottomVisible) && filmStatus !== 'loading') {
      dispatch(fetchFilmsOnTop({
        count: 5,
        filter: currentFilter,
        fetchAfter: currentFetchAfterId,
      }));
    }
  }, [dispatch, isBottomVisible, filmStatus]);

  /** Handle sort button click. */
  function handleSortClick(): void {
    setFilterType(filterType === 'sort' ? null : 'sort');
  }
  /** Handle search button click. */
  function handleSearchClick(): void {
    setFilterType(filterType === 'search' ? null : 'search');
  }

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
