import { memo, VFC } from 'react';
import { Film } from 'src/models/film';
import { formatDate } from 'src/utils/formatDate';
import cls from './FilmListItem.module.css';

interface Props {
  /** Film. */
  readonly film: Film;
}

const FilmListItemComponent: VFC<Props> = ({ film }) => (
  <div className={cls['film-card']}>
    <div className={cls.header}>
      <div className={cls.title}>{film.title}</div>
      <div className={cls.date}>{formatDate(film.releaseDate)}</div>
    </div>
    <div className={cls.staff}>
      {film.director}
    </div>
  </div>
);

export const FilmListItem = memo(FilmListItemComponent);
