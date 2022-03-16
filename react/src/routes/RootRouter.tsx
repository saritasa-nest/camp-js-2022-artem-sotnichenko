import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { authRoutes } from 'src/features/auth/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/auth" />,
  },
  ...authRoutes,
];

export const RootRouter: React.VFC = () => useRoutes(routes);
