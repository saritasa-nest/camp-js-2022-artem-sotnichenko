import { memo, VFC } from 'react';
import { Film } from 'src/models/film';
import { formatDate } from 'src/utils/format-date';
import cls from './FilmCard.module.css';

interface Props {
  /** Film. */
  film: Film;
}

const FilmCardComponent: VFC<Props> = ({ film }) => (
  <div className={cls['film-card']}>
    <div className={cls.header}>
      <div className={cls.title}>{film.title}</div>
      <div className={cls.date}>{formatDate(film.releaseDate)}</div>
    </div>
    <div>
      {film.director}
    </div>
  </div>
);

export const FilmCard = memo(FilmCardComponent);
