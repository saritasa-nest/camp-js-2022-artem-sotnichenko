import {
  ChangeEvent,
  memo, useCallback, VFC,
} from 'react';
import { TextField } from '@mui/material';
import {
  FieldHookConfig, useField,
} from 'formik';

interface Props {
  /** Field label. */
  readonly label: string;
}

const SPLIT_CHARACTER = ',';

const FilmFormListFieldComponent: VFC<Props & FieldHookConfig<unknown[]>> = ({
  label, name,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const list = event.target.value;
    helpers.setValue(list.split(SPLIT_CHARACTER));
  }, [helpers]);

  return (
    <TextField
      variant="outlined"
      label={label}
      name={field.name}
      value={field.value.join(SPLIT_CHARACTER)}
      onChange={handleChange}
      error={Boolean(meta.error)}
      helperText={meta.error}
    />
  );
};

export const FilmFormListField = memo(FilmFormListFieldComponent);
