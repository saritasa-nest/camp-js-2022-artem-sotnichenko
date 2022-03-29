import { memo, VFC } from 'react';
import { Skeleton } from '@mui/material';
import cls from './ChipsSkeleton.module.css';

interface Props {
  /** Dummy values of chips. */
  readonly count: number;
}

const MAX_WIDTH = 200;
const MIN_WIDTH = 50;

/**
 * Create array of random width.
 * @param count Items count.
 */
function createWidthArray(count: number): number[] {
  return Array.from({ length: count }).map(() => Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH) + MIN_WIDTH));
}

const ChipsSkeletonComponent: VFC<Props> = ({ count }) => (
  <>
    {createWidthArray(count).map((width, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Skeleton variant="rectangular" key={index} className={cls.chip} width={width} height={32} />
    ))}
  </>
);

export const ChipsSkeleton = memo(ChipsSkeletonComponent);
