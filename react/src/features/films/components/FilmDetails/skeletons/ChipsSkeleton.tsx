import { memo, VFC } from 'react';
import { Skeleton } from '@mui/material';
import cls from './ChipsSkeleton.module.css';

interface Props {
  /** Dummy values of chips. */
  readonly widthArray: readonly number[];
}

const ChipsSkeletonComponent: VFC<Props> = ({ widthArray }) => (
  <>
    {widthArray.map(width => (
      <Skeleton key={width} variant="rectangular" className={cls.chip} width={width} height={32} />
    ))}
  </>
);

export const ChipsSkeleton = memo(ChipsSkeletonComponent);
