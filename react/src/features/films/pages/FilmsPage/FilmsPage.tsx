import { memo, VFC } from 'react';
import { Outlet } from 'react-router-dom';
import cls from './FilmsPage.module.css';
import { Sidebar } from '../../components/Sidebar';

const FilmsPageComponent: VFC = () => (
  <div className={cls.films}>
    <Sidebar />
    <Outlet />
  </div>
);

export const FilmsPage = memo(FilmsPageComponent);
