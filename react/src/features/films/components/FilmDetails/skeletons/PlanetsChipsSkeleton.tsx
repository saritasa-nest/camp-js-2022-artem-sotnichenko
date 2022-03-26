import { memo, VFC } from 'react';
import { ChipsSkeleton } from './ChipsSkeleton';

const DUMMY_VALUES = ['Tatooine', 'Yavin IV', 'Felucia'];

const PlanetsChipsSkeletonComponent: VFC = () => (
  <ChipsSkeleton
    dummyValues={DUMMY_VALUES}
  />
);

export const PlanetsChipsSkeleton = memo(PlanetsChipsSkeletonComponent);
