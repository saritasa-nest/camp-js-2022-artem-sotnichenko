import { Skeleton, Typography } from '@mui/material';
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
      <Typography>
        <Skeleton width="120px" />
      </Typography>
      <Typography>
        <Skeleton width="80px" />
      </Typography>
    </div>
    <div className={parentCls.rowItem}>
      <Typography>
        <Skeleton width="80px" />
      </Typography>
      <Typography>
        <Skeleton width="120px" />
      </Typography>
    </div>
    <div className={parentCls.rowItem}>
      <Typography>
        <Skeleton width="100px" />
      </Typography>
      <Typography>
        <Skeleton width="240px" />
      </Typography>
    </div>
    <div className={parentCls.colItem}>
      <Skeleton variant="text"><div>Planets</div></Skeleton>
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
