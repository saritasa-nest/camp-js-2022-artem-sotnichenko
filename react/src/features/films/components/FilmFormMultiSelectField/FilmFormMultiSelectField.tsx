import {
  memo, useCallback, VFC,
} from 'react';
import {
  FieldHookConfig, useField,
} from 'formik';
import { MultiSelectField } from 'src/components/MultiSelectField';
import { Entity } from 'src/models/entity';

interface Props {
  /** Field label. */
  readonly label: string;

  /** Field label. */
  readonly entities: Entity[];
}

const FilmFormMultiSelectFieldComponent: VFC<Props & FieldHookConfig<string>> = ({
  label, entities, name,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = useCallback((ids: readonly Entity['id'][]) => {
    helpers.setValue(ids);
  }, [helpers]);

  return (
    <MultiSelectField
      name={field.name}
      label={label}
      entities={entities}
      error={Boolean(meta.error)}
      helperText={meta.error}
      selectedIds={field.value}
      onChange={handleChange}
    />
  );
};

export const FilmFormMultiSelectField = memo(FilmFormMultiSelectFieldComponent);
