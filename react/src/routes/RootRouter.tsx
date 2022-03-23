import { VFC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { authRoutes } from 'src/features/auth/routes';
import { filmsRoutes } from 'src/features/films/routes';
import { AuthLoadingGuard } from './guards/AuthLoadingGuard';

const routes: RouteObject[] = [
  {
    element: <AuthLoadingGuard />,
    children: [
      {
        path: '*',
        element: <Navigate to="/films" />,
      },
      ...authRoutes,
      ...filmsRoutes,
    ],
  },
];

export const RootRouter: VFC = () => useRoutes(routes);
