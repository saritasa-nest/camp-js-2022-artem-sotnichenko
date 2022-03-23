import { Box } from '@mui/system';
import {
  memo, useCallback, useEffect, useState, VFC,
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
  const [filter, setFilter] = useState<FilmFilter>();

  /**
   * Filter change handler.
   */
  const handleFilterChange = useCallback((newFilter: FilmFilter | null) => {
    setFilter(newFilter ?? undefined);
  }, []);

  useEffect(() => {
    dispatch(clearFilms());

    if (filmStatus !== 'loading') {
      dispatch(fetchFilms({ filter }));
    }

    return () => {
      dispatch(clearFilms());
    };
  }, [filter]);

  const afterId = films.at(-1)?.id ?? undefined;

  /**
   * Load more films handler.
   */
  const handleLoadMore = useCallback(() => {
    if (filmStatus !== 'loading') {
      dispatch(fetchFilmsOnTop({ filter, afterId }));
    }
  }, [dispatch, filmStatus, filter, afterId]);

  return (
    <div className={cls.films}>
      <aside className={cls.sidebar}>
        <SidebarHeader onChange={handleFilterChange} />
        <div className={cls['list-wrap']}>
          <FilmList films={films} onLoadMore={handleLoadMore} />
        </div>
      </aside>
      <Box>
        film placeholder
      </Box>
    </div>
  );
};

export const Sidebar = memo(SidebarComponent);
