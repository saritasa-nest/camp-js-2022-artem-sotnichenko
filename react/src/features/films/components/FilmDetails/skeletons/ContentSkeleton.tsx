import { Skeleton } from '@mui/material';
import { memo, VFC } from 'react';
import parentCls from '../FilmDetails.module.css';
import { CharactersChipsSkeleton } from './CharactersChipsSkeleton';
import { PlanetsChipsSkeleton } from './PlanetsChipsSkeleton';

const ContentSkeletonComponent: VFC = () => (
  <>
    <div className={parentCls.colItem}>
      <Skeleton variant="text"><div>Description</div></Skeleton>
      <div>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="95%" />
      </div>
    </div>
    <div className={parentCls.rowItem}>
      <Skeleton variant="text" width="120px" />
      <Skeleton variant="text" width="240px" />
    </div>
    <div className={parentCls.rowItem}>
      <Skeleton variant="text" width="80px" />
      <Skeleton variant="text" width="120px" />
    </div>
    <div className={parentCls.rowItem}>
      <Skeleton variant="text" width="100px" />
      <Skeleton variant="text" width="160px" />
    </div>
    <div className={parentCls.colItem}>
      <Skeleton variant="text" width="80px" />
      <div className={parentCls.chips}>
        <PlanetsChipsSkeleton />
      </div>
    </div>
    <div className={parentCls.colItem}>
      <Skeleton variant="text"><div>Characters</div></Skeleton>
      <div className={parentCls.chips}>
        <CharactersChipsSkeleton />
      </div>
    </div>
  </>
);

export const ContentSkeleton = memo(ContentSkeletonComponent);
