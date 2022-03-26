import {
  memo, useCallback, useMemo, useState, VFC,
} from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchFilms, fetchFilmsOnTop } from 'src/store/film/dispatchers';
import { selectAllFilms, selectFilmLoading } from 'src/store/film/selectors';
import { clearFilms } from 'src/store/film/slice';
import { debounce } from '@mui/material';
import { Query } from 'src/api/services/query.service';
import { FilmQueryField } from 'src/models/filmQueryField';
import { useParams } from 'react-router-dom';
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
  const handleQueryChangeDebounced = useMemo(() => debounce(handleQueryChange, 500), []);

  /**
   * Load more films handler.
   */
  const handleLoadMore = useCallback(() => {
    if (!isFilmLoading) {
      dispatch(fetchFilmsOnTop({ query: query ?? undefined, afterId: fetchAfterId }));
    }
  }, [dispatch, query, fetchAfterId]);

  return (
    <aside className={cls.sidebar}>
      <SidebarHeader onChange={handleQueryChangeDebounced} />
      <div className={cls.listWrap}>
        <FilmList activeId={filmId} films={films} onLoadMore={handleLoadMore} />
      </div>
    </aside>
  );
};

export const Sidebar = memo(SidebarComponent);
