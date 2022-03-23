import {
  memo, useCallback, useState, VFC,
} from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchFilms, fetchFilmsOnTop } from 'src/store/film/dispatchers';
import { selectAllFilms, selectFilmStatus } from 'src/store/film/selectors';
import type { FilmFilter } from 'src/api/services/film.service';
import { clearFilms } from 'src/store/film/slice';
import { SidebarHeader } from '../SidebarHeader';
import { FilmList } from '../FilmList/FilmList';
import cls from './Sidebar.module.css';

const SidebarComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const films = useAppSelector(selectAllFilms);
  const filmStatus = useAppSelector(selectFilmStatus);

  const [filter, setFilter] = useState<FilmFilter | null>(null);
  const fetchAfterId = films.at(-1)?.id;

  /**
   * Filter change handler.
   */
  const handleFilterChange = useCallback((newFilter: FilmFilter | null) => {
    setFilter(newFilter);

    if (filmStatus !== 'loading') {
      dispatch(clearFilms());
      dispatch(fetchFilms({ filter: newFilter }));
    }
  }, [dispatch, filmStatus]);

  /**
   * Load more films handler.
   */
  const handleLoadMore = useCallback(() => {
    if (filmStatus !== 'loading') {
      dispatch(fetchFilmsOnTop({ filter, afterId: fetchAfterId }));
    }
  }, [dispatch, filmStatus, filter, fetchAfterId]);

  return (
    <aside className={cls.sidebar}>
      <SidebarHeader onChange={handleFilterChange} />
      <div className={cls['list-wrap']}>
        <FilmList films={films} onLoadMore={handleLoadMore} />
      </div>
    </aside>
  );
};

export const Sidebar = memo(SidebarComponent);
