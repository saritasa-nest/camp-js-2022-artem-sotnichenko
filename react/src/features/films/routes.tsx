import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { AuthorizedOnlyGuard } from 'src/routes/guards/AuthorizedOnlyGuard';
import { FilmDetailsPage } from './pages/FilmDetailsPage';

const FilmsPage = lazy(() => import('./pages/FilmsPage').then(module => ({ default: module.FilmsPage })));

export const filmsRoutes: RouteObject[] = [
  {
    element: <AuthorizedOnlyGuard />,
    children: [
      {
        path: 'films',
        element: <FilmsPage />,
        children: [
          {
            path: ':id',
            element: <FilmDetailsPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="films" />,
      },
    ],
  },
];
