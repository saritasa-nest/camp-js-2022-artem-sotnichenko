import { memo, VFC } from 'react';
import { ChipsSkeleton } from './ChipsSkeleton';

const WIDTH_ARRAY = [
  140,
  50,
  150,
  130,
  80,
  200,
  100,
  40,
  90,
];

const CharactersChipsSkeletonComponent: VFC = () => (
  <ChipsSkeleton
    widthArray={WIDTH_ARRAY}
  />
);

export const CharactersChipsSkeleton = memo(CharactersChipsSkeletonComponent);
