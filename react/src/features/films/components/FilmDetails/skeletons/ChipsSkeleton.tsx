import { memo, VFC } from 'react';
import { Skeleton } from '@mui/material';
import cls from './ChipsSkeleton.module.css';

interface Props {
  /** Dummy values of chips. */
  readonly count: number;
}

const MAX_WIDTH = 20;
const MIN_WIDTH = 5;

/**
 * Create width array.
 * @param count Items count.
 */
function createWidthArray(count: number): number[] {
  return Array.from({ length: count }).map(() => Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH) + MIN_WIDTH));
}

const ChipsSkeletonComponent: VFC<Props> = ({ count }) => (
  <>
    {createWidthArray(count).map(width => (
      <Skeleton key={width} variant="rectangular" className={cls.chip} width={`${width}ch`} height={32} />
    ))}
  </>
);

export const ChipsSkeleton = memo(ChipsSkeletonComponent);
