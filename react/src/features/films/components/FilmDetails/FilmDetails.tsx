import {
  memo, useEffect, VFC,
} from 'react';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  Chip, IconButton, Tooltip, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Film } from 'src/models/film';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectPlanetsByIds } from 'src/store/planet/selectors';
import { fetchPlanetsByIds } from 'src/store/planet/dispatchers';
import { selectCharactersByIds } from 'src/store/character/selectors';
import { fetchCharactersByIds } from 'src/store/character/dispatchers';
import { setActiveFilm } from 'src/store/film/slice';
import { formatDate } from 'src/utils/formatDate';
import { Header } from '../Header';
import { ContentSkeleton } from './skeletons/ContentSkeleton';
import { ChipsSkeleton } from './skeletons/ChipsSkeleton';
import cls from './FilmDetails.module.css';

interface Props {
  /** Film. */
  readonly film?: Film;
}

const FilmDetailsComponent: VFC<Props> = ({ film }) => {
  const planets = useAppSelector(state => selectPlanetsByIds(state, film?.planetIds ?? []));
  const planetNames = planets.map(planet => planet.name);
  const isPlanetsLoading = planets.length !== film?.planetIds.length;

  const characters = useAppSelector(state => selectCharactersByIds(state, film?.characterIds ?? []));
  const characterNames = characters.map(character => character.name);
  const isCharactersLoading = characters.length !== film?.characterIds.length;

  const dispatch = useAppDispatch();

  useEffect((): (() => void) => {
    if (film != null) {
      dispatch(setActiveFilm(film.id));
      dispatch(fetchPlanetsByIds(film.planetIds));
      dispatch(fetchCharactersByIds(film.characterIds));
    }
    return () => dispatch(setActiveFilm(null));
  }, [dispatch, film]);

  return (
    <div className={cls.film}>
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
              <IconButton type="button" size="small">
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
                <div>
                  <ul>
                    {film.producers.map(producer => (
                      <li className={cls.listItem}>
                        {producer}
                      </li>
                    ))}
                  </ul>

                </div>
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
