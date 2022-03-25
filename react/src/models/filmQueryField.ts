/* eslint-disable import/export */
/** Query direction. */
export enum FilmQueryField {
  Title = 'fields.title',
  Producers = 'fields.producer',
  Director = 'fields.director',
  ReleaseDate = 'fields.release_date',
}

export namespace FilmQueryField {
  const TO_READABLE_MAP: Readonly<Record<FilmQueryField, string>> = {
    [FilmQueryField.Title]: 'Title',
    [FilmQueryField.Producers]: 'Producers',
    [FilmQueryField.Director]: 'Director',
    [FilmQueryField.ReleaseDate]: 'Release date',
  };

  export const entires = Object.entries(TO_READABLE_MAP);

  /**
   * Maps query film sort field to human-readable value.
   * @param filmSortField Film sort field.
   */
  export function toReadable(filmSortField: FilmQueryField): string {
    return TO_READABLE_MAP[filmSortField];
  }
}
