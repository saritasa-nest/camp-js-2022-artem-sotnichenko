import * as Yup from 'yup';

export const FilmFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3)
    .required(),
  openingCrawl: Yup.string()
    .min(3)
    .required(),
  director: Yup.string()
    .min(3)
    .required(),
  producers: Yup.array().of(
    Yup.string()
      .min(3),
  )
    .min(1)
    .required(),
  releaseDate: Yup.string()
    .required(),
  characterIds: Yup.array()
    .label('characters')
    .min(1)
    .required(),
  planetIds: Yup.array()
    .label('planets')
    .min(1)
    .required(),
});
