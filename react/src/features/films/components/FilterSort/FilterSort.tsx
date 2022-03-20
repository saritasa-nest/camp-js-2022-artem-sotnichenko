import {
  IconButton, MenuItem, OutlinedInput, Select, SelectChangeEvent, Tooltip,
} from '@mui/material';
import { memo, useState, VFC } from 'react';
import {
  SortDirection, SortField, TO_READABLE_SORT_DIRECTION_MAP, TO_READABLE_SORT_FIELD_MAP,
} from 'src/api/services/film.service';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import cls from './FilterSort.module.css';

interface Props {
  /** Handler for sort field change. */
  readonly selectedSortField: SortField;

  /** Handler for sort direction change. */
  readonly selectedSortDirection: SortDirection;

  /** Handler for sort field change. */
  readonly onSortFieldChange: (sortField: SortField) => void;

  /** Handler for sort direction change. */
  readonly onSortDirectionChange: (sortDirection: SortDirection) => void;
}

const FilterSortComponent: VFC<Props> = ({
  selectedSortField,
  selectedSortDirection,
  onSortFieldChange,
  onSortDirectionChange,
}) => {
  const [sortField, setSortField] = useState(selectedSortField);
  const [sortDirection, setSortDirection] = useState<SortDirection>(selectedSortDirection);

  /**
   * Handle sort field change.
   */
  function handleSortDirectionClick(): void {
    const newSortDirection = sortDirection === SortDirection.Ascending
      ? SortDirection.Descending
      : SortDirection.Ascending;

    // dispatch(setSort(e.target.value));
    setSortDirection(newSortDirection);
    onSortDirectionChange(newSortDirection);
  }
  /**
   * Handle sort field change.
   * @param e Change event.
   */
  function handleSortFieldChange(e: SelectChangeEvent<unknown>): void {
    // dispatch(setSort(e.target.value));
    if (typeof e.target.value === 'string') {
      const newSortField = e.target.value as SortField;
      setSortField(newSortField);
      onSortFieldChange(newSortField);
    }
  }

  const fields = Object.entries(TO_READABLE_SORT_FIELD_MAP).map(([value, text]) => ({ value, text }));

  return (
    <div className={cls.sort}>
      <Select
        className={cls.sort__select}
        onChange={e => handleSortFieldChange(e)}
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
      <Tooltip title={TO_READABLE_SORT_DIRECTION_MAP[sortDirection]}>
        <IconButton onClick={() => handleSortDirectionClick()}>
          {sortDirection === SortDirection.Ascending
            ? <ArrowUpward />
            : <ArrowDownward />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export const FilterSort = memo(FilterSortComponent);
