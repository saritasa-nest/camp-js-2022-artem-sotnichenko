import { memo, VFC } from 'react';
import { ChipsSkeleton } from './ChipsSkeleton';

const DUMMY_VALUES = [
  'Luke Skywalker',
  'C-3PO',
  'Raymus Antilles',
  'Wilhuff Tarkin',
  'Lama Su',
  'Beru Whitesun lars',
  'Obi-Wan Kenobi',
  'R2-D2',
  'Chewbacca',
];

const CharactersChipsSkeletonComponent: VFC = () => (
  <ChipsSkeleton
    dummyValues={DUMMY_VALUES}
  />
);

export const CharactersChipsSkeleton = memo(CharactersChipsSkeletonComponent);
