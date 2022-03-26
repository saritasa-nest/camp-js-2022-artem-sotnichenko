import { memo, useEffect, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchFilm } from 'src/store/film/dispatchers';
import { selectFilmById } from 'src/store/film/selectors';
import { FilmDetails } from '../../components/FilmDetails';

const FilmDetailsPageComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string; }>();

  const filmId = params.id ?? '';
  const film = useAppSelector(state => selectFilmById(state, filmId));

  useEffect(() => {
    if (film == null) {
      dispatch(fetchFilm(filmId));
    }
  }, [film, dispatch, filmId]);

  return <FilmDetails film={film} />;
};

export const FilmDetailsPage = memo(FilmDetailsPageComponent);
