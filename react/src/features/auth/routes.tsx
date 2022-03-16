import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const AuthPage = lazy(() => import('./pages/AuthPage').then(module => ({ default: module.AuthPage })));

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: <AuthPage />,
  },
  {
    path: '*',
    element: <Navigate to="auth" />,
  },
];
