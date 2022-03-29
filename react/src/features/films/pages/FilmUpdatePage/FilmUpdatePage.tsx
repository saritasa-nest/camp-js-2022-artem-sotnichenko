import {
  memo, useCallback, VFC,
} from 'react';
import {
  CircularProgress, IconButton, Tooltip,
} from '@mui/material';
import {
  Save as SaveIcon,
} from '@mui/icons-material';
import { FilmForm as FilmFormType } from 'src/models/filmForm';
import { useAppDispatch, useAppSelector } from 'src/store';
import { updateFilm } from 'src/store/film/dispatchers';
import { useNavigate, useParams } from 'react-router-dom';
import { selectFilmById } from 'src/store/film/selectors';
import { Header } from '../../components/Header';
import { FilmForm } from '../../components/FilmForm';
import cls from './FilmUpdatePage.module.css';

const FilmUpdatePageComponent: VFC = () => {
  const params = useParams<{ id: string; }>();
  const filmId = params.id ?? '';
  const film = useAppSelector(state => selectFilmById(state, filmId));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFilmFormSubmit = useCallback(async (filmForm: FilmFormType) => {
    const updatedFilm = await dispatch(updateFilm({ id: filmId, filmForm })).unwrap();
    navigate(`/films/${updatedFilm.id}`);
  }, [dispatch, navigate, filmId]);

  return (
    <div className={cls.filmCreate}>
      {film != null
        ? (
          <FilmForm
            film={film}
            onSubmit={handleFilmFormSubmit}
            header={(
              <Header
                title="Updating film"
                buttons={(
                  <Tooltip title="Save">
                    <IconButton type="submit" size="small">
                      <SaveIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              />
            )}
          />
        )
        : <CircularProgress />}
    </div>
  );
};

export const FilmUpdatePage = memo(FilmUpdatePageComponent);
