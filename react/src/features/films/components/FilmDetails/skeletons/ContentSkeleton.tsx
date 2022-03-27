import { Skeleton } from '@mui/material';
import { memo, VFC } from 'react';
import { formatDate } from 'src/utils/formatDate';
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
      <Skeleton variant="text"><div>Release date</div></Skeleton>
      <Skeleton variant="text"><div>{formatDate(new Date())}</div></Skeleton>
    </div>
    <div className={parentCls.rowItem}>
      <Skeleton variant="text"><div>Director</div></Skeleton>
      <Skeleton variant="text"><div>Name Surname</div></Skeleton>
    </div>
    <div className={parentCls.rowItem}>
      <Skeleton variant="text"><div>Producers</div></Skeleton>
      <Skeleton variant="text"><div>Name Surname, Name Surname</div></Skeleton>
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
