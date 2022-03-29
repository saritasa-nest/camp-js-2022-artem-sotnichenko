import {
  Chip, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, OutlinedInputProps, Select, SelectChangeEvent,
} from '@mui/material';
import {
  memo, ReactNode, useCallback, VFC,
} from 'react';
import cls from './FilmMultiSelectField.module.css';

interface Entity {
  /** Entity id. */
  readonly id: string;

  /** Entity name. */
  readonly name: string;
}

interface Props extends Pick<OutlinedInputProps, 'error'> {
  /** Input name. */
  readonly name: string;

  /** Label. */
  readonly label: string;

  /** On change handler. */
  readonly onChange?: (event: readonly string[]) => void;

  /** Entities. */
  readonly entities: readonly Entity[];

  /** Selected entities ids. */
  readonly selectedIds: readonly Entity['id'][];

  /** Helper text. */
  readonly helperText: ReactNode;
}

const FilmMultiSelectFieldComponent: VFC<Props> = ({
  name, label, onChange, entities, selectedIds, error, helperText,
}) => {
  const handleChange = useCallback((event: SelectChangeEvent<readonly string[]>): void => {
    const ids = event.target.value;

    if (Array.isArray(ids) && onChange != null) {
      onChange(ids);
    }
  }, [onChange]);

  const getName = useCallback(
    (selectedId: string) => entities.find(entity => entity.id === selectedId)?.name,
    [entities],
  );

  return (
    <FormControl>
      <InputLabel error={error} id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        multiple
        value={selectedIds}
        onChange={handleChange}
        input={<OutlinedInput error={error} label={label} />}
        renderValue={selected => (
          <div className={cls.chips}>
            {selected.map(selectedId => (
              <Chip key={selectedId} label={getName(selectedId)} />
            ))}
          </div>
        )}
      >
        {entities.map(entity => (
          <MenuItem
            key={entity.id}
            value={entity.id}
          >
            {entity.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export const FilmMultiSelectField = memo(FilmMultiSelectFieldComponent);
