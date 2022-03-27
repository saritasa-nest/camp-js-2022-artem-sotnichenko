import { Chip, Skeleton } from '@mui/material';
import { memo, VFC } from 'react';
import cls from './ChipsSkeleton.module.css';

interface Props {
  /** Dummy values of chips. */
  readonly dummyValues: readonly string[];
}

const ChipsSkeletonComponent: VFC<Props> = ({ dummyValues }) => (
  <>
    {dummyValues.map(text => (
      <Skeleton key={text} variant="rectangular" className={cls.chip}><Chip label={text} /></Skeleton>
    ))}
  </>
);

export const ChipsSkeleton = memo(ChipsSkeletonComponent);
