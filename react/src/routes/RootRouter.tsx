import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { authRoutes } from 'src/features/auth/routes';
import { filmsRoutes } from 'src/features/films/routes';
import { AuthGuard } from './guards/Auth';

const routes: RouteObject[] = [
  {
    element: <AuthGuard />,
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

export const RootRouter: React.VFC = () => useRoutes(routes);
