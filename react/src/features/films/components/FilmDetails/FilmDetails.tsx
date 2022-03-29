import {
  memo, useCallback, useEffect, useState, VFC,
} from 'react';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  Chip, IconButton, Tooltip, Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Film } from 'src/models/film';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectPlanetLoading, selectPlanetsByIds } from 'src/store/planet/selectors';
import { fetchPlanetsByIds } from 'src/store/planet/dispatchers';
import { selectCharacterLoading, selectCharactersByIds } from 'src/store/character/selectors';
import { fetchCharactersByIds } from 'src/store/character/dispatchers';
import { setActiveFilm } from 'src/store/film/slice';
import { formatDate } from 'src/utils/formatDate';
import { removeFilm } from 'src/store/film/dispatchers';
import { Header } from '../Header';
import { ContentSkeleton } from './skeletons/ContentSkeleton';
import { ChipsSkeleton } from './skeletons/ChipsSkeleton';
import { FilmDeleteDialog } from '../FilmDeleteDialog';
import cls from './FilmDetails.module.css';

interface Props {
  /** Film. */
  readonly film?: Film;
}

const FilmDetailsComponent: VFC<Props> = ({ film }) => {
  const isPlanetsLoading = useAppSelector(selectPlanetLoading);
  const planets = useAppSelector(state => selectPlanetsByIds(state, film?.planetIds ?? []));
  const planetNames = planets.map(planet => planet.name);

  const isCharactersLoading = useAppSelector(selectCharacterLoading);
  const characters = useAppSelector(state => selectCharactersByIds(state, film?.characterIds ?? []));
  const characterNames = characters.map(character => character.name);

  const dispatch = useAppDispatch();

  useEffect((): (() => void) => {
    if (film != null) {
      dispatch(setActiveFilm(film.id));
      dispatch(fetchPlanetsByIds(film.planetIds));
      dispatch(fetchCharactersByIds(film.characterIds));
    }
    return () => dispatch(setActiveFilm(null));
  // `film` as a dependency lead to unnecessary rerender,
  // when film fetched two times width `fetchFilm` (film page), `fetchFilms` (film sidebar)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, film?.id]);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteDialogOpen = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, [setIsDeleteDialogOpen]);

  const handleDeleteDialogClose = useCallback(() => {
    setIsDeleteDialogOpen(false);
  }, [setIsDeleteDialogOpen]);

  const navigate = useNavigate();

  const handleDelete = useCallback(() => {
    setIsDeleteDialogOpen(false);
    if (film != null) {
      navigate('..');
      dispatch(removeFilm(film.id));
    }
  }, [setIsDeleteDialogOpen, dispatch, film, navigate]);

  return (
    <div className={cls.film}>
      <FilmDeleteDialog
        title={film?.title}
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDelete}
      />
      <Header
        title={film?.title}
        buttons={(
          <>
            <Tooltip title="Update">
              <IconButton type="button" component={Link} to="update" size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton type="button" onClick={handleDeleteDialogOpen} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
      )}
      />
      <div className={cls.content}>
        {film != null
          ? (
            <>
              <div className={cls.colItem}>
                <Typography component="h2" className={cls.subtitle}>Description</Typography>
                <div>{film.openingCrawl}</div>
              </div>
              <div className={cls.rowItem}>
                <Typography component="h2" className={cls.subtitle}>Release date</Typography>
                <div>{formatDate(film.releaseDate)}</div>
              </div>
              <div className={cls.rowItem}>
                <Typography component="h2" className={cls.subtitle}>Director</Typography>
                <div>{film.director}</div>
              </div>
              <div className={cls.rowItem}>
                <Typography component="h2" className={cls.subtitle}>Producers</Typography>
                <div>{film.producers.join(', ')}</div>
              </div>
              <div className={cls.colItem}>
                <Typography component="h2" className={cls.subtitle}>Planets</Typography>
                <div className={cls.chips}>
                  {isPlanetsLoading
                    ? <ChipsSkeleton count={5} />
                    : planetNames.map(name => <Chip key={name} label={name} />)}
                </div>
              </div>
              <div className={cls.colItem}>
                <Typography component="h2" className={cls.subtitle}>Characters</Typography>
                <div className={cls.chips}>
                  {isCharactersLoading
                    ? <ChipsSkeleton count={10} />
                    : characterNames.map(name => <Chip key={name} label={name} />)}
                </div>
              </div>
            </>
          )
          : <ContentSkeleton />}
      </div>
    </div>
  );
};

export const FilmDetails = memo(FilmDetailsComponent);
