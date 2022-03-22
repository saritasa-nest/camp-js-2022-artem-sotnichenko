import { Box } from '@mui/system';
import {
  memo, useCallback, useEffect, useState, VFC,
} from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchFilms, fetchFilmsOnTop } from 'src/store/film/dispatchers';
import { selectAllFilms, selectFilmStatus } from 'src/store/film/selectors';
import type { FilmFetchFilter } from 'src/api/services/film.service';
import { clearFilms } from 'src/store/film/slice';
import { FilmList } from '../../components/FilmList';
import cls from './FilmsPage.module.css';
import { FilmFilter } from '../../components/FilmFilter';

const FilmsPageComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const films = useAppSelector(selectAllFilms);
  const filmStatus = useAppSelector(selectFilmStatus);
  const [filter, setFilter] = useState<FilmFetchFilter>();

  /**
   * Filter change handler.
   */
  const handleFilterChange = useCallback((newFilter: FilmFetchFilter | null) => {
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
        <FilmFilter onChange={handleFilterChange} />
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

export const FilmsPage = memo(FilmsPageComponent);
