import { memo, VFC } from 'react';
import cls from './FilmsPage.module.css';
import { Sidebar } from '../../components/Sidebar';

const FilmsPageComponent: VFC = () => (
  <div className={cls.films}>
    <Sidebar />
    <div>
      film placeholder
    </div>
  </div>
);

export const FilmsPage = memo(FilmsPageComponent);
