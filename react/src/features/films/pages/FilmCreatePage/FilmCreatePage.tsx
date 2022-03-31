import {
  memo, useCallback, useState, VFC,
} from 'react';
import {
  Backdrop,
  CircularProgress,
  IconButton, Tooltip,
} from '@mui/material';
import {
  Save as SaveIcon,
} from '@mui/icons-material';
import { useAppDispatch } from 'src/store';
import { createFilm } from 'src/store/film/dispatchers';
import { useNavigate } from 'react-router-dom';
import { FilmCreate } from 'src/models/filmCreate';
import { Header } from '../../components/Header';
import { FilmForm } from '../../components/FilmForm';
import cls from './FilmCreatePage.module.css';

const FilmCreatePageComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleFilmFormSubmit = useCallback(async (filmForm: FilmCreate) => {
    setIsLoading(true);
    const createdFilm = await dispatch(createFilm(filmForm)).unwrap();
    setIsLoading(false);
    navigate(`/films/${createdFilm.id}`);
  }, [dispatch, navigate]);

  return (
    <div className={cls.filmCreate}>
      <FilmForm
        onSubmit={handleFilmFormSubmit}
        header={(
          <Header
            title="Creating film"
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
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export const FilmCreatePage = memo(FilmCreatePageComponent);
