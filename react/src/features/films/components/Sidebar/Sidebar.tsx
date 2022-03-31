import {
  memo, useCallback, useMemo, useState, VFC,
} from 'react';
import { useParams } from 'react-router-dom';
import { debounce } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchFilms } from 'src/store/film/dispatchers';
import { selectActiveFilmId, selectAllFilms, selectFilmLoading } from 'src/store/film/selectors';
import { clearFilms } from 'src/store/film/slice';
import { Query } from 'src/api/services/query.service';
import { FilmQueryField } from 'src/models/filmQueryField';
import { SidebarHeader } from '../SidebarHeader';
import { FilmList } from '../FilmList/FilmList';
import cls from './Sidebar.module.css';

const SidebarComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const films = useAppSelector(selectAllFilms);
  const isFilmLoading = useAppSelector(selectFilmLoading);

  const [query, setQuery] = useState<Query<FilmQueryField> | null>(null);
  const fetchAfterId = films.at(-1)?.id;

  const params = useParams<{ id: string; }>();

  const filmId = useMemo(() => params.id ?? '', [params.id]);

  /**
   * Query change handler.
   * @param newQuery Film query.
   */
  const handleQueryChange = (newQuery: Query<FilmQueryField> | null): void => {
    setQuery(newQuery);

    if (!isFilmLoading) {
      dispatch(clearFilms());
      dispatch(fetchFilms({
        query: newQuery ?? undefined,
      }));
    }
  };

  /** Memoized and debounced version of query change handler. */
  // `handleQueryChange` need to be wrapped with useCallback for this, that is unnecessary.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleQueryChangeDebounced = useMemo(() => debounce(handleQueryChange, 500), []);

  // Placing active film first.
  const activeFilmId = useAppSelector(selectActiveFilmId);
  const filteredFilms = useMemo(() => {
    const activeFilm = films.find(film => film.id === activeFilmId);
    const inactiveFilms = films.filter(film => film.id !== activeFilmId);
    return activeFilm != null ? [activeFilm, ...inactiveFilms] : inactiveFilms;
  }, [activeFilmId, films]);

  /**
   * Load more films handler.
   */
  const handleLoadMore = useCallback(() => {
    if (!isFilmLoading) {
      dispatch(fetchFilms({ query: query ?? undefined, afterId: fetchAfterId }));
    }
  }, [dispatch, query, fetchAfterId, isFilmLoading]);

  return (
    <aside className={cls.sidebar}>
      <SidebarHeader onChange={handleQueryChangeDebounced} />
      <div className={cls.listWrap}>
        <FilmList activeId={filmId} films={filteredFilms} onLoadMore={handleLoadMore} />
      </div>
    </aside>
  );
};

export const Sidebar = memo(SidebarComponent);
