import {
  memo, useCallback, useMemo, useState, VFC,
} from 'react';
import {
  IconButton, MenuItem, OutlinedInput, Select, Tooltip,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import { FilmQueryField } from 'src/models/filmQueryField';
import { QueryDirection } from 'src/models/queryDirection';
import { FilmQuery } from 'src/api/services/film.service';
import { Header } from '../Header';
import cls from './SidebarHeader.module.css';

interface Props {
  /** Callback on query change. */
  readonly onChange: (query: FilmQuery | null) => void;
}

const SidebarHeaderComponent: VFC<Props> = ({ onChange }) => {
  const [isQueryVisible, setIsQueryVisible] = useState(false);
  const handleOptionsToggle = useCallback(() => {
    setIsQueryVisible(!isQueryVisible);
    if (!isQueryVisible === false) {
      onChange(null);
    }
  }, [isQueryVisible, onChange]);

  const handleFormChange = (query: FilmQuery): void => {
    onChange(query);
  };

  const formik = useFormik({
    initialValues: {
      searchText: '',
      field: FilmQueryField.Title,
      direction: QueryDirection.Ascending,
    },
    onSubmit: handleFormChange,
    validate: handleFormChange,
  });

  const handleDirectionChange = useCallback((previousDirection: string) => () => {
    const newDirection = previousDirection === QueryDirection.Ascending
      ? QueryDirection.Descending
      : QueryDirection.Ascending;
    formik.setFieldValue('direction', newDirection);
  }, [formik]);

  const fields = useMemo(() => FilmQueryField.entires.map(([value, text]) => ({ value, text })), []);

  return (
    <Header
      title="Films"
      buttons={(
        <Tooltip title={isQueryVisible ? 'Hide options' : 'Show options'}>
          <IconButton type="button" onClick={handleOptionsToggle} size="small">
            {isQueryVisible
              ? <KeyboardArrowUpIcon fontSize="small" />
              : <KeyboardArrowDownIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      )}
    >
      {isQueryVisible
      && (
      <>
        <div className={cls.query}>
          <OutlinedInput
            className={cls.searchText}
            placeholder="Search"
            name="searchText"
            onChange={formik.handleChange}
            value={formik.values.searchText}
          />
        </div>
        <div className={cls.query}>
          <Select
            name="field"
            onChange={formik.handleChange}
            input={<OutlinedInput className={cls.fieldInput} label="Name" />}
            value={formik.values.field}
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
          <Tooltip title={QueryDirection.toReadable(formik.values.direction)}>
            <IconButton type="button" onClick={handleDirectionChange(formik.values.direction)}>
              {formik.values.direction === QueryDirection.Ascending
                ? <ArrowUpwardIcon />
                : <ArrowDownwardIcon />}
            </IconButton>
          </Tooltip>
        </div>
      </>
      )}
    </Header>
  );
};

export const SidebarHeader = memo(SidebarHeaderComponent);
