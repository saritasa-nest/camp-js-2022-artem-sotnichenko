import { VFC } from 'react';
import {
  Navigate, Outlet, To, useLocation,
} from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectUser } from 'src/store/auth/selectors';

export const UnauthorizedOnlyGuard: VFC = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  const redirect: To = {
    pathname: '/',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (user) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
