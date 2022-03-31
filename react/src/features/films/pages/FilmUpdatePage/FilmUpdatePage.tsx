import {
  memo, useCallback, useState, VFC,
} from 'react';
import {
  Backdrop,
  CircularProgress, IconButton, Tooltip,
} from '@mui/material';
import {
  Save as SaveIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'src/store';
import { updateFilm } from 'src/store/film/dispatchers';
import { useNavigate, useParams } from 'react-router-dom';
import { selectFilmById } from 'src/store/film/selectors';
import { FilmUpdate } from 'src/models/filmUpdate';
import { Header } from '../../components/Header';
import { FilmForm } from '../../components/FilmForm';
import cls from './FilmUpdatePage.module.css';

const FilmUpdatePageComponent: VFC = () => {
  const params = useParams<{ id: string; }>();
  const filmId = params.id ?? '';
  const film = useAppSelector(state => selectFilmById(state, filmId));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleFilmFormSubmit = useCallback(async (filmForm: FilmUpdate) => {
    setIsLoading(true);
    const updatedFilm = await dispatch(updateFilm({ id: filmId, filmForm })).unwrap();
    setIsLoading(false);
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
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export const FilmUpdatePage = memo(FilmUpdatePageComponent);
