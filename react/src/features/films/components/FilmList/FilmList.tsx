import { CircularProgress } from '@mui/material';
import {
  memo, useEffect, useRef, VFC,
} from 'react';
import { Film } from 'src/models/film';
import { useAppSelector } from 'src/store';
import { selectFilmStatus } from 'src/store/film/selectors';
import { useIntersectionObserver } from '../../hooks/use-intersection-observer';
import { FilmCard } from '../FilmCard';
import cls from './FilmList.module.css';

interface Props {
  /** Films. */
  readonly films: readonly Film[];

  /** Whether there more films. */
  readonly hasMore?: boolean;

  /** Callback to load more films. */
  readonly onLoadMore: () => void;
}

const FilmListComponent: VFC<Props> = ({ films, onLoadMore }) => {
  const endOfListRef = useRef<HTMLDivElement | null>(null);
  const ioEntry = useIntersectionObserver(endOfListRef);

  useEffect(() => {
    if (ioEntry?.isIntersecting) {
      onLoadMore();
    }
  }, [ioEntry, films]);

  const filmStatus = useAppSelector(selectFilmStatus);

  return (
    <div className={cls['film-list']}>
      {films.map(film => <FilmCard key={film.id} film={film} />)}
      {(filmStatus === 'loading' || true) && <CircularProgress />}
      <div ref={endOfListRef} />
    </div>
  );
};

export const FilmList = memo(FilmListComponent);
