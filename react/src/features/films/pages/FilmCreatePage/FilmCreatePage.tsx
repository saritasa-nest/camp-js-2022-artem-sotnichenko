import {
  memo, useCallback, VFC,
} from 'react';
import {
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

  const handleFilmFormSubmit = useCallback(async (filmForm: FilmCreate) => {
    const createdFilm = await dispatch(createFilm(filmForm)).unwrap();
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
    </div>
  );
};

export const FilmCreatePage = memo(FilmCreatePageComponent);
