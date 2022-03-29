import {
  ChangeEvent, memo, ReactNode, useCallback, useEffect, useMemo, VFC,
} from 'react';
import { Form, Formik, useFormik } from 'formik';
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
import { MultiSelectField } from 'src/components/MultiSelectField';
import cls from './FilmForm.module.css';
import { FilmFormSchema } from './FilmFormSchema';
import { FilmFormTextField } from '../FilmFormTextField/FilmFormTextField';
import { FilmFormDateField } from '../FilmFormDateField/FilmFormDateField';
import { FilmFormListField } from '../FilmFormListField/FilmFormListField';

interface Props {
  /** Initial film value. */
  readonly film?: Film;

  /** Change handler. */
  readonly onSubmit: (film: FilmFormType) => void;

  /** Header. */
  readonly header: ReactNode;
}

const DEFAULT_FILM_FORM: FilmFormType = {
  title: '',
  openingCrawl: '',
  director: '',
  producers: [],
  releaseDate: new Date(),
  characterIds: [],
  planetIds: [],
};

const FilmFormComponent: VFC<Props> = ({
  film, onSubmit, header,
}) => {
  const initialValues = film ?? DEFAULT_FILM_FORM;

  const formik = useFormik({
    initialValues,
    validationSchema: FilmFormSchema,
    onSubmit: values => {
      if (formik.isValid) {
        onSubmit(values);
      }
    },
  });

  const dispatch = useAppDispatch();

  const planets = useAppSelector(selectAllPlanets);
  const characters = useAppSelector(selectAllCharacters);

  useEffect(() => {
    dispatch(fetchAllPlanets());
    dispatch(fetchAllCharacters());
  }, [dispatch]);

  const handlePlanetsChange = useCallback((planetIds: readonly Planet['id'][]) => {
    formik.setFieldValue('planetIds', planetIds);
  }, [formik]);

  const handleCharactersChange = useCallback((characterIds: readonly Character['id'][]) => {
    formik.setFieldValue('characterIds', characterIds);
  }, [formik]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FilmFormSchema}
      onSubmit={v => console.log(v)}
      validate={v => console.log(v)}
    >
      <Form className={cls.filmForm}>
        {header}
        <div className={cls.fields}>
          <FilmFormTextField label="Title" name="title" />
          <FilmFormTextField isMultiline label="Opening crawl" name="openingCrawl" />
          <FilmFormTextField label="Director" name="director" />
          <FilmFormListField label="Producer" name="producers" />
          <FilmFormDateField label="Release date" name="releaseDate" />
          {/* <TextField
          variant="outlined"
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.title)}
          helperText={formik.errors.title}
        /> */}
          {/* <TextField
            variant="outlined"
            multiline
            rows={4}
            label="Opening crawl"
            name="openingCrawl"
            value={formik.values.openingCrawl}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.openingCrawl)}
            helperText={formik.errors.openingCrawl}
          /> */}
          {/* <div className={cls.row}>
            <TextField
              variant="outlined"
              label="Director"
              name="director"
              onChange={formik.handleChange}
              error={Boolean(formik.errors.director)}
              value={formik.values[name]}
              helperText={formik.errors[name]}
            />
            <TextField
              variant="outlined"
              label="Producers"
              name="producers"
              value={producers}
              onChange={handleProducersChange}
              error={Boolean(formik.errors.producers)}
              helperText={formik.errors.producers}
            />
            <TextField
              variant="outlined"
              label="Release date"
              name="releaseDate"
              type="date"
              value={releaseDate}
              onChange={handleReleaseDateChange}
              error={Boolean(formik.errors.releaseDate)}
              helperText={formik.errors.releaseDate}
            />
          </div>
          <MultiSelectField
            name="planets"
            label="Planets"
            entities={planets}
            error={Boolean(formik.errors.planetIds)}
            helperText={formik.errors.planetIds}
            selectedIds={formik.values.planetIds}
            onChange={handlePlanetsChange}
          />
          <MultiSelectField
            name="characters"
            label="Characters"
            entities={characters}
            error={Boolean(formik.errors.characterIds)}
            helperText={formik.errors.characterIds}
            selectedIds={formik.values.characterIds}
            onChange={handleCharactersChange}
          /> */}
        </div>
      </Form>
    </Formik>
  );
};

export const FilmForm = memo(FilmFormComponent);
