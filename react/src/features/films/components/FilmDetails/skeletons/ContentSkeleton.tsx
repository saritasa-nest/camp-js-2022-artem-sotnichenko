import { memo, VFC } from 'react';
import { Skeleton } from '@mui/material';
import cls from '../FilmDetails.module.css';
import { CharactersChipsSkeleton } from './CharactersChipsSkeleton';
import { PlanetsChipsSkeleton } from './PlanetsChipsSkeleton';

const ContentSkeletonComponent: VFC = () => (
  <>
    <div className={cls.colItem}>
      <Skeleton variant="text"><div>Description</div></Skeleton>
      <div>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="95%" />
      </div>
    </div>
    <div className={cls.rowItem}>
      <Skeleton variant="text" width="120px" />
      <Skeleton variant="text" width="240px" />
    </div>
    <div className={cls.rowItem}>
      <Skeleton variant="text" width="80px" />
      <Skeleton variant="text" width="120px" />
    </div>
    <div className={cls.rowItem}>
      <Skeleton variant="text" width="100px" />
      <Skeleton variant="text" width="160px" />
    </div>
    <div className={cls.colItem}>
      <Skeleton variant="text" width="80px" />
      <div className={cls.chips}>
        <PlanetsChipsSkeleton />
      </div>
    </div>
    <div className={cls.colItem}>
      <Skeleton variant="text"><div>Characters</div></Skeleton>
      <div className={cls.chips}>
        <CharactersChipsSkeleton />
      </div>
    </div>
  </>
);

export const ContentSkeleton = memo(ContentSkeletonComponent);
