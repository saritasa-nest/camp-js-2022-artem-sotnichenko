import { memo, VFC } from 'react';
import { ChipsSkeleton } from './ChipsSkeleton';

const WIDTH_ARRAY = [70, 40, 100];

const PlanetsChipsSkeletonComponent: VFC = () => (
  <ChipsSkeleton
    widthArray={WIDTH_ARRAY}
  />
);

export const PlanetsChipsSkeleton = memo(PlanetsChipsSkeletonComponent);
