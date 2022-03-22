import { memo, VFC } from 'react';
import { Film } from 'src/models/film';
import { FilmCard } from '../FilmCard';

import cls from './FilmList.module.css';

interface Props {
  /** Films. */
  readonly films: readonly Film[];
}

const FilmListComponent: VFC<Props> = ({ films }) => (
  <div className={cls['film-list']}>{films.map(film => <FilmCard key={film.id} film={film} />)}</div>
);

export const FilmList = memo(FilmListComponent);
