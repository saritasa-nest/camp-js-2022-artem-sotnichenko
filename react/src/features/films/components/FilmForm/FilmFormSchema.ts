import * as Yup from 'yup';

export const FilmFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Should be at least 3 characters long.')
    .required('Required.'),
  openingCrawl: Yup.string()
    .min(3, 'Should be at least 3 characters long.')
    .required('Required'),
  director: Yup.string()
    .min(3, 'Should be at least 3 characters long.')
    .required('Required'),
  producers: Yup.array().of(
    Yup.string()
      .min(3, 'Should be at least 3 characters long.'),
  )
    .min(1, 'Should have at least 1 producer.')
    .required('Required'),
  releaseDate: Yup.string()
    .required('Required'),
  characterIds: Yup.array()
    .min(1, 'Should have at least 1 character.')
    .required('Required'),
  planetIds: Yup.array()
    .min(1, 'Should have at least 1 planet.')
    .required('Required'),
});
