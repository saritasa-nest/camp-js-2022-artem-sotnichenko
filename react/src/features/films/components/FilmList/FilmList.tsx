import { CircularProgress } from '@mui/material';
import {
  memo, useEffect, useRef, VFC,
} from 'react';
import { Film } from 'src/models/film';
import { useAppSelector } from 'src/store';
import { selectFilmLoading } from 'src/store/film/selectors';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { FilmListItem } from '../FilmListItem';
import cls from './FilmList.module.css';

interface Props {
  /** Films. */
  readonly films: readonly Film[];

  /** Active film id. */
  readonly activeId?: Film['id'];

  /** Callback to load more films. */
  readonly onLoadMore: () => void;
}

const FilmListComponent: VFC<Props> = ({ films, activeId, onLoadMore }) => {
  const endOfListRef = useRef<HTMLDivElement | null>(null);
  const ioEntry = useIntersectionObserver(endOfListRef);

  useEffect(() => {
    if (ioEntry?.isIntersecting) {
      onLoadMore();
    }
  }, [ioEntry, films, onLoadMore]);

  const isFilmLoading = useAppSelector(selectFilmLoading);

  return (
    <div className={cls.filmList}>
      {films.map(film => <FilmListItem isActive={film.id === activeId} key={film.id} film={film} />)}
      {isFilmLoading && <CircularProgress />}
      <div ref={endOfListRef} />
    </div>
  );
};

export const FilmList = memo(FilmListComponent);
