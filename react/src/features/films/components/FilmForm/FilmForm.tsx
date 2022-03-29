import {
  memo, ReactNode, useEffect, VFC,
} from 'react';
import {
  Form, Formik,
} from 'formik';
import { Film } from 'src/models/film';
import type { FilmForm as FilmFormType } from 'src/models/filmForm';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchAllPlanets } from 'src/store/planet/dispatchers';
import { selectAllPlanets } from 'src/store/planet/selectors';
import { fetchAllCharacters } from 'src/store/character/dispatchers';
import { selectAllCharacters } from 'src/store/character/selectors';
import cls from './FilmForm.module.css';
import { FilmFormSchema } from './FilmFormSchema';
import { FilmFormTextField } from '../FilmFormTextField/FilmFormTextField';
import { FilmFormDateField } from '../FilmFormDateField/FilmFormDateField';
import { FilmFormListField } from '../FilmFormListField/FilmFormListField';
import { FilmFormMultiSelectField } from '../FilmFormMultiSelectField/FilmFormMultiSelectField';

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllPlanets());
    dispatch(fetchAllCharacters());
  }, [dispatch]);

  const planets = useAppSelector(selectAllPlanets);
  const characters = useAppSelector(selectAllCharacters);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FilmFormSchema}
      onSubmit={onSubmit}
    >
      <Form className={cls.filmForm}>
        {header}
        <div className={cls.fields}>
          <FilmFormTextField label="Title" name="title" />
          <FilmFormTextField isMultiline label="Opening crawl" name="openingCrawl" />
          <FilmFormTextField label="Director" name="director" />
          <FilmFormListField label="Producer" name="producers" />
          <FilmFormDateField label="Release date" name="releaseDate" />
          <FilmFormMultiSelectField label="Planets" name="planetIds" entities={planets} />
          <FilmFormMultiSelectField label="Characters" name="characterIds" entities={characters} />
        </div>
      </Form>
    </Formik>
  );
};

export const FilmForm = memo(FilmFormComponent);
