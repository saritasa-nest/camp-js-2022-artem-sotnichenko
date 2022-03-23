import {
  ChangeEvent, memo, useEffect, useState, VFC,
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
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState(FilmSortField.Title);
  const [sortDirection, setSortDirection] = useState(FilmSortDirection.Ascending);

  const handleSearchTextChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => { setSearchText(event.target.value); };

  const handleSortFieldChange = setSortField;
  const handleSortDirectionChange = setSortDirection;

  useEffect(() => {
    if (currentFilterType === FilterType.Search) {
      return onChange({ searchText });
    }
    if (currentFilterType === FilterType.Sort) {
      return onChange({ sortField, sortDirection });
    }
    return onChange(null);
  }, [currentFilterType, searchText, sortField, sortDirection]);

  /** Handle sort button click. */
  const handleSortClick = (): void => {
    setFilterType(currentFilterType === FilterType.Sort ? null : FilterType.Sort);
  };

  /** Handle search button click. */
  const handleSearchClick = (): void => {
    setFilterType(currentFilterType === FilterType.Search ? null : FilterType.Search);
  };

  return (
    <div className={cls.header}>
      <div className={cls.options}>
        <div>Films</div>
        <div className={cls.buttons}>
          <Tooltip title="Sort">
            <IconButton size="small" onClick={handleSortClick}>
              <SortIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search">
            <IconButton size="small" onClick={handleSearchClick}>
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
            value={searchText}
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
