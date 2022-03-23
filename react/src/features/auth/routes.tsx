import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { UnauthorizedOnlyGuard } from 'src/routes/guards/UnauthorizedOnlyGuard';

const AuthPage = lazy(() => import('./pages/AuthPage').then(module => ({ default: module.AuthPage })));

export const authRoutes: RouteObject[] = [
  {
    element: <UnauthorizedOnlyGuard />,
    children: [
      {
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: '*',
        element: <Navigate to="auth" />,
      },
    ],
  },
];
