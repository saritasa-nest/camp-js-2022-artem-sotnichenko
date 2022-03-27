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

  const [filmForm, setFilmForm] = useState<FilmFormType | undefined>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSave = useCallback(async () => {
    if (filmForm != null && filmId != null) {
      const updatedFilm = await dispatch(updateFilm({ id: filmId, filmForm })).unwrap();
      navigate(`/films/${updatedFilm.id}`);
    }
  }, [filmForm, dispatch, navigate]);

  const handleFilmFormChange = useCallback(setFilmForm, [setFilmForm]);

  return (
    <div className={cls.filmCreate}>
      <Header
        title="Updating film"
        buttons={(
          <Tooltip title="Save">
            <IconButton onClick={handleSave} size="small">
              <SaveIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      />
      <FilmForm film={film} onChange={handleFilmFormChange} />
    </div>
  );
};

export const FilmUpdatePage = memo(FilmUpdatePageComponent);
