import { memo, VFC } from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'src/models/film';
import { formatDate } from 'src/utils/formatDate';
import cls from './FilmListItem.module.css';

interface Props {
  /** Film. */
  readonly film: Film;

  /** Whether is film active. */
  readonly isActive: boolean;
}

const FilmListItemComponent: VFC<Props> = ({ film, isActive }) => (
  <Link to={film.id} className={`${cls.filmCard} ${isActive ? cls.isActive : ''}`}>
    <div className={cls.header}>
      <div className={cls.title}>{film.title}</div>
      <div className={cls.date}>{formatDate(film.releaseDate)}</div>
    </div>
    <div className={cls.staff}>
      {film.director}
    </div>
  </Link>
);

export const FilmListItem = memo(FilmListItemComponent);
