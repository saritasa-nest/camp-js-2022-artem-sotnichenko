import {
  IconButton, OutlinedInput, Tooltip,
} from '@mui/material';
import {
  memo, ReactElement, useEffect, useState, VFC,
} from 'react';
import {
  Sort, Search,
} from '@mui/icons-material';
import {
  FilmFetchFilter, FilmSortDirection, FilmSortField,
} from 'src/api/services/film.service';
import cls from './FilmFilter.module.css';
import { FilmFilterSort } from '../FilmFilterSort';

interface Props {
  /** Callback on filter change. */
  onChange: (filter: FilmFetchFilter | null) => void;
}

const FilmFilterComponent: VFC<Props> = ({ onChange }) => {
  const [filterType, setFilterType] = useState<'search' | 'sort' | null>(null);
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState(FilmSortField.Title);
  const [sortDirection, setSortDirection] = useState(FilmSortDirection.Ascending);

  useEffect(() => {
    if (filterType === 'search') {
      return onChange({ searchText });
    }
    if (filterType === 'sort') {
      return onChange({ sortField, sortDirection });
    }
    return onChange(null);
  }, [filterType, searchText, sortField, sortDirection]);

  /** Handle sort button click. */
  const handleSortClick = (): void => {
    setFilterType(filterType === 'sort' ? null : 'sort');
  };
    /** Handle search button click. */
  const handleSearchClick = (): void => {
    setFilterType(filterType === 'search' ? null : 'search');
  };

  /** Shows one of filters. */
  function getFilterBlock(): ReactElement | null {
    if (filterType === 'search') {
      return (
        <div className={cls.filter}>
          <OutlinedInput
            className={cls['search-input']}
            placeholder="Search"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
      );
    }
    if (filterType === 'sort') {
      return (
        <div className={cls.filter}>
          <FilmFilterSort
            selectedSortField={sortField}
            selectedSortDirection={sortDirection}
            onSortFieldChange={field => setSortField(field)}
            onSortDirectionChange={direction => setSortDirection(direction)}
          />
        </div>
      );
    }
    return null;
  }

  return (
    <div className={cls.header}>
      <div className={cls.options}>
        <div>Films</div>
        <div className={cls.buttons}>
          <Tooltip title="Sort">
            <IconButton size="small" onClick={() => handleSortClick()}>
              <Sort fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search">
            <IconButton size="small" onClick={() => handleSearchClick()}>
              <Search fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {getFilterBlock()}
    </div>
  );
};

export const FilmFilter = memo(FilmFilterComponent);
