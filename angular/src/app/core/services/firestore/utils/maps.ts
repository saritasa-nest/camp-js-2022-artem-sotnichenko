import { SortDirection, SortField } from './types';

export const TO_READABLE_SORT_FIELD_MAP: Readonly<Record<SortField, string>> = {
  [SortField.Title]: 'Title',
  [SortField.Producers]: 'Producers',
  [SortField.Director]: 'Director',
  [SortField.ReleaseDate]: 'Release date',
};

export const TO_READABLE_SORT_DIRECTION_MAP: Readonly<Record<SortDirection, string>> = {
  [SortDirection.Ascending]: 'Ascending',
  [SortDirection.Descending]: 'Descending',
};
