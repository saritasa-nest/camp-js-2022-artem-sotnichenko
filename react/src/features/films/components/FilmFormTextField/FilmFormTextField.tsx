import {
  memo, VFC,
} from 'react';
import { TextField } from '@mui/material';
import {
  FieldHookConfig, useField,
} from 'formik';

interface Props {
  /** Field label. */
  readonly label: string;

  /** Field label. */
  readonly isMultiline?: boolean;

}

const FilmFormTextFieldComponent: VFC<Props & FieldHookConfig<string>> = ({
  label, name, isMultiline = false,
}) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      variant="outlined"
      multiline={isMultiline}
      label={label}
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      error={Boolean(meta.error)}
      helperText={meta.error}
    />
  );
};

export const FilmFormTextField = memo(FilmFormTextFieldComponent);
