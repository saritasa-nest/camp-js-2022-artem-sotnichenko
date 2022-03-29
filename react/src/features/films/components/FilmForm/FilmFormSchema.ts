import * as Yup from 'yup';

export const FilmFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .required('Required'),
  openingCrawl: Yup.string()
    .min(3, 'Too Short!')
    .required('Required'),
  director: Yup.string()
    .min(3, 'Too Short!')
    .required('Required'),
  producers: Yup.array()
    .min(1, 'Too short!')
    .required('Required'),
  releaseDate: Yup.string()
    .required('Required'),
  characterIds: Yup.array()
    .min(1, 'Too short!')
    .required('Required'),
  planetIds: Yup.array()
    .min(1, 'Too short!')
    .required('Required'),
});
