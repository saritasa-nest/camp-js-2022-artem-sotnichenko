import {
  IconButton, MenuItem, OutlinedInput, Select, SelectChangeEvent, Tooltip,
} from '@mui/material';
import { memo, useState, VFC } from 'react';
import {
  FilmService, FilmSortDirection, FilmSortField,
} from 'src/api/services/film.service';
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import cls from './FilmFilterSort.module.css';

interface Props {
  /** Handler for sort field change. */
  readonly selectedSortField: FilmSortField;

  /** Handler for sort direction change. */
  readonly selectedSortDirection: FilmSortDirection;

  /** Handler for sort field change. */
  readonly onSortFieldChange: (sortField: FilmSortField) => void;

  /** Handler for sort direction change. */
  readonly onSortDirectionChange: (sortDirection: FilmSortDirection) => void;
}

const FilmFilterSortComponent: VFC<Props> = ({
  selectedSortField,
  selectedSortDirection,
  onSortFieldChange,
  onSortDirectionChange,
}) => {
  const [sortField, setSortField] = useState(selectedSortField);
  const [sortDirection, setSortDirection] = useState<FilmSortDirection>(selectedSortDirection);

  /**
   * Handle sort field change.
   */
  const handleSortDirectionClick = (): void => {
    const newSortDirection = sortDirection === FilmSortDirection.Ascending
      ? FilmSortDirection.Descending
      : FilmSortDirection.Ascending;

    setSortDirection(newSortDirection);
    onSortDirectionChange(newSortDirection);
  };
  /**
   * Handle sort field change.
   * @param event Change event.
   */
  const handleSortFieldChange = (event: SelectChangeEvent<unknown>): void => {
    if (typeof event.target.value === 'string') {
      const newSortField = event.target.value as FilmSortField;
      setSortField(newSortField);
      onSortFieldChange(newSortField);
    }
  };

  const fields = Object.entries(FilmService.sortFieldMap)
    .map(([value, text]) => ({ value, text }));

  return (
    <div className={cls.sort}>
      <Select
        className={cls.sort__select}
        onChange={handleSortFieldChange}
        input={<OutlinedInput className={cls.sort__field} label="Name" />}
        value={sortField}
        label="Sort field"
      >
        {fields.map(field => (
          <MenuItem
            key={field.value}
            value={field.value}
          >
            {field.text}
          </MenuItem>
        ))}
      </Select>
      <Tooltip title={FilmService.sortDirectionMap[sortDirection]}>
        <IconButton onClick={handleSortDirectionClick}>
          {sortDirection === FilmSortDirection.Ascending
            ? <ArrowUpwardIcon />
            : <ArrowDownwardIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export const FilmFilterSort = memo(FilmFilterSortComponent);
