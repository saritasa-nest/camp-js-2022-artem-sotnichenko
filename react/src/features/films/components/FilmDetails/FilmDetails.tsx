import { memo, useEffect, VFC } from 'react';
import { Film } from 'src/models/film';
import {
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  Chip, IconButton, Tooltip,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectPlanetLoading, selectPlanetsByIds } from 'src/store/planet/selectors';
import { fetchPlanetsByIds } from 'src/store/planet/dispatchers';
import { selectCharacterLoading, selectCharactersByIds } from 'src/store/character/selectors';
import { fetchCharactersByIds } from 'src/store/character/dispatchers';
import { Header } from '../Header';
import cls from './FilmDetails.module.css';
import { ContentSkeleton } from './skeletons/ContentSkeleton';
import { PlanetsChipsSkeleton } from './skeletons/PlanetsChipsSkeleton';
import { CharactersChipsSkeleton } from './skeletons/CharactersChipsSkeleton';

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

  useEffect(() => {
    if (film?.planetIds != null) {
      dispatch(fetchPlanetsByIds(film.planetIds));
    }
  }, [dispatch, film?.planetIds]);

  useEffect(() => {
    if (film?.characterIds != null) {
      dispatch(fetchCharactersByIds(film.characterIds));
    }
  }, [dispatch, film?.characterIds]);

  return (
    <div className={cls.film}>
      <Header
        title={film?.title}
        buttons={(
          <Tooltip title="Delete">
            <IconButton size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
      )}
      />
      <div className={cls.content}>
        {film
          ? (
            <>
              <div className={cls.colItem}>
                <h2 className={cls.subtitle}>Description</h2>
                <div>{film?.openingCrawl}</div>
              </div>
              <div className={cls.rowItem}>
                <h2 className={cls.subtitle}>Release date</h2>
                <div>{film?.releaseDate.toISOString()}</div>
              </div>
              <div className={cls.rowItem}>
                <h2 className={cls.subtitle}>Director</h2>
                <div>{film?.director}</div>
              </div>
              <div className={cls.rowItem}>
                <h2 className={cls.subtitle}>Producers</h2>
                <div>{film?.producers.join(', ')}</div>
              </div>
              <div className={cls.colItem}>
                <h2 className={cls.subtitle}>Planets</h2>
                <div className={cls.chips}>
                  {!isPlanetsLoading
                    ? planetNames.map(name => <Chip key={name} label={name} />)
                    : <PlanetsChipsSkeleton />}
                </div>
              </div>
              <div className={cls.colItem}>
                <h2 className={cls.subtitle}>Characters</h2>
                <div className={cls.chips}>
                  {!isCharactersLoading
                    ? characterNames.map(name => <Chip key={name} label={name} />)
                    : <CharactersChipsSkeleton />}
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
