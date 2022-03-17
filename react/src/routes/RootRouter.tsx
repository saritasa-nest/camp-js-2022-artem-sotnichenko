import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

export const RootRouter: React.VFC = () => useRoutes(routes);
