import {
  memo, useCallback, useMemo, useState, VFC,
} from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchFilms, fetchFilmsOnTop } from 'src/store/film/dispatchers';
import { selectAllFilms, selectFilmLoading } from 'src/store/film/selectors';
import type { FilmFilter } from 'src/api/services/film.service';
import { clearFilms } from 'src/store/film/slice';
import { debounce } from '@mui/material';
import { SidebarHeader } from '../SidebarHeader';
import { FilmList } from '../FilmList/FilmList';
import cls from './Sidebar.module.css';

const SidebarComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const films = useAppSelector(selectAllFilms);
  const isFilmLoading = useAppSelector(selectFilmLoading);

  const [filter, setFilter] = useState<FilmFilter | null>(null);
  const fetchAfterId = films.at(-1)?.id;

  /**
   * Filter change handler.
   * @param newFilter Film filter.
   */
  const handleFilterChange = (newFilter: FilmFilter | null): void => {
    setFilter(newFilter);

    if (!isFilmLoading) {
      dispatch(clearFilms());
      dispatch(fetchFilms({ filter: newFilter }));
    }
  };

  /** Memoized and debounced version of filter change handler. */
  const handleFilterChangeDebounced = useMemo(() => debounce(handleFilterChange, 500), []);

  /**
   * Load more films handler.
   */
  const handleLoadMore = useCallback(() => {
    if (!isFilmLoading) {
      dispatch(fetchFilmsOnTop({ filter, afterId: fetchAfterId }));
    }
  }, [dispatch, filter, fetchAfterId]);

  return (
    <aside className={cls.sidebar}>
      <SidebarHeader onChange={handleFilterChangeDebounced} />
      <div className={cls['list-wrap']}>
        <FilmList films={films} onLoadMore={handleLoadMore} />
      </div>
    </aside>
  );
};

export const Sidebar = memo(SidebarComponent);
