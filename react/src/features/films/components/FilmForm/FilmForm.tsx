import {
  memo, useCallback, useEffect, VFC,
} from 'react';
import { useFormik } from 'formik';
import { Film } from 'src/models/film';
import type { FilmForm as FilmFormType } from 'src/models/filmForm';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchAllPlanets } from 'src/store/planet/dispatchers';
import { selectAllPlanets } from 'src/store/planet/selectors';
import { fetchAllCharacters } from 'src/store/character/dispatchers';
import { selectAllCharacters } from 'src/store/character/selectors';
import { Planet } from 'src/models/planet';
import { Character } from 'src/models/character';
import { FilmMultiSelectField } from '../FilmMultiSelectField';
import cls from './FilmForm.module.css';

type FormikFilmForm = Omit<FilmFormType, 'releaseDate' | 'producers'> & {
  /** Release date. Html input date use take string as value. */
  readonly releaseDate: string;

  /** Producers. */
  readonly producers: string;
};

interface Props {
  /** Initial film value. */
  readonly film?: Film;

  /** Change handler. */
  readonly onChange: (film: FilmFormType) => void;
}

/**
 * Format date.
 * @param date Date.
 */
function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const FilmFormComponent: VFC<Props> = ({ film, onChange }) => {
  const initialValues: FormikFilmForm = {
    title: film?.title ?? '',
    openingCrawl: film?.openingCrawl ?? '',
    director: film?.director ?? '',
    producers: film?.producers.join(',') ?? '',
    releaseDate: formatDate(film?.releaseDate ?? new Date()),
    characterIds: film?.characterIds ?? [],
    planetIds: film?.planetIds ?? [],
  };

  // Formik have no `onChange` event, so `validate` used for this.
  const handleValidate = useCallback((formValues: FormikFilmForm): void => {
    onChange({
      title: formValues.title,
      openingCrawl: formValues.openingCrawl,
      director: formValues.director,
      producers: formValues.producers.split(','),
      releaseDate: new Date(formValues.releaseDate),
      characterIds: formValues.characterIds,
      planetIds: formValues.planetIds,
    });
  }, [onChange]);

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validate: handleValidate,
  });

  const dispatch = useAppDispatch();

  const planets = useAppSelector(selectAllPlanets);
  const characters = useAppSelector(selectAllCharacters);

  useEffect(() => {
    dispatch(fetchAllPlanets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllCharacters());
  }, [dispatch]);

  const handlePlanetsChange = useCallback((planetIds: readonly Planet['id'][]) => {
    formik.setFieldValue('planetIds', planetIds);
  }, [formik]);

  const handleCharactersChange = useCallback((characterIds: readonly Character['id'][]) => {
    formik.setFieldValue('characterIds', characterIds);
  }, [formik]);

  return (
    <form className={cls.filmForm} onSubmit={formik.handleSubmit}>
      <TextField
        variant="outlined"
        label="Title"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      <TextField
        variant="outlined"
        multiline
        rows={4}
        label="Opening crawl"
        name="openingCrawl"
        value={formik.values.openingCrawl}
        onChange={formik.handleChange}
      />
      <div className={cls.row}>
        <TextField
          variant="outlined"
          label="Director"
          name="director"
          value={formik.values.director}
          onChange={formik.handleChange}
        />
        <TextField
          variant="outlined"
          label="Producers"
          name="producers"
          value={formik.values.producers}
          onChange={formik.handleChange}
        />
        <TextField
          variant="outlined"
          label="Release date"
          name="releaseDate"
          type="date"
          value={formik.values.releaseDate}
          onChange={formik.handleChange}
        />
      </div>
      <FilmMultiSelectField
        name="planets"
        label="Planets"
        entities={planets}
        selectedIds={formik.values.planetIds}
        onChange={handlePlanetsChange}
      />
      <FilmMultiSelectField
        name="characters"
        label="Characters"
        entities={characters}
        selectedIds={formik.values.characterIds}
        onChange={handleCharactersChange}
      />
    </form>
  );
};

export const FilmForm = memo(FilmFormComponent);
