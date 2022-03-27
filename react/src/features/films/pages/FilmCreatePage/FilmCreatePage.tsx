import {
  memo, useCallback, useState, VFC,
} from 'react';
import { FilmForm as FilmFormType } from 'src/models/filmForm';
import {
  IconButton, Tooltip,
} from '@mui/material';
import {
  Save as SaveIcon,
} from '@mui/icons-material';
import { useAppDispatch } from 'src/store';
import { createFilm } from 'src/store/film/dispatchers';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { FilmForm } from '../../components/FilmForm';
import cls from './FilmCreatePage.module.css';

const FilmCreatePageComponent: VFC = () => {
  const [filmForm, setFilmForm] = useState<FilmFormType>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSave = useCallback(async () => {
    if (filmForm != null) {
      const createdFilm = await dispatch(createFilm(filmForm)).unwrap();
      navigate(`/films/${createdFilm.id}`);
    }
  }, [filmForm, dispatch, navigate]);

  const handleFilmFormChange = useCallback(setFilmForm, [setFilmForm]);

  return (
    <div className={cls.filmCreate}>
      <Header
        title="Creating film"
        buttons={(
          <Tooltip title="Save">
            <IconButton onClick={handleSave} size="small">
              <SaveIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      />
      <FilmForm onChange={handleFilmFormChange} />
    </div>
  );
};

export const FilmCreatePage = memo(FilmCreatePageComponent);
