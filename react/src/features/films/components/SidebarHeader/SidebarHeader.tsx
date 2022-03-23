import {
  ChangeEvent, memo, useCallback, useState, VFC,
} from 'react';
import {
  IconButton, OutlinedInput, Tooltip,
} from '@mui/material';
import {
  Sort as SortIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import type { FilmFilter } from 'src/api/services/film.service';
import { FilmSortDirection, FilmSortField } from 'src/api/services/film.service';
import cls from './SidebarHeader.module.css';
import { FilmFilterSort } from '../FilmFilterSort';

interface Props {
  /** Callback on filter change. */
  readonly onChange: (filter: FilmFilter | null) => void;
}

/** Filter type. */
enum FilterType {
  Search,
  Sort,
}

const SidebarHeaderComponent: VFC<Props> = ({ onChange }) => {
  const [currentFilterType, setFilterType] = useState<FilterType | null>(null);

  const [sortField, setSortField] = useState(FilmSortField.Title);
  const [sortDirection, setSortDirection] = useState(FilmSortDirection.Ascending);

  const handleSearchTextChange = useCallback((
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => onChange({ searchText: event.target.value }), [onChange]);

  const handleSortFieldChange = useCallback((field: FilmSortField) => {
    setSortField(field);
    onChange({ sortField, sortDirection });
  }, [onChange, setSortField, sortField, sortDirection]);

  const handleSortDirectionChange = useCallback((direction: FilmSortDirection) => {
    setSortDirection(direction);
    onChange({ sortField, sortDirection });
  }, [onChange, setSortDirection, sortField, sortDirection]);

  const handleFilterButtonClick = useCallback((buttonFilterType: FilterType) => () => {
    const newFilterType = currentFilterType === buttonFilterType ? null : buttonFilterType;
    setFilterType(newFilterType);
    if (newFilterType === null) {
      onChange(null);
    }
  }, [currentFilterType, onChange]);

  return (
    <div className={cls.header}>
      <div className={cls.options}>
        <div>Films</div>
        <div className={cls.buttons}>
          <Tooltip title="Sort">
            <IconButton size="small" onClick={handleFilterButtonClick(FilterType.Sort)}>
              <SortIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search">
            <IconButton size="small" onClick={handleFilterButtonClick(FilterType.Search)}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {currentFilterType === FilterType.Search && (
        <div className={cls.filter}>
          <OutlinedInput
            className={cls['search-input']}
            placeholder="Search"
            onChange={handleSearchTextChange}
          />
        </div>
      )}
      {currentFilterType === FilterType.Sort && (
        <div className={cls.filter}>
          <FilmFilterSort
            selectedSortField={sortField}
            selectedSortDirection={sortDirection}
            onSortFieldChange={handleSortFieldChange}
            onSortDirectionChange={handleSortDirectionChange}
          />
        </div>
      )}
    </div>
  );
};

export const SidebarHeader = memo(SidebarHeaderComponent);
