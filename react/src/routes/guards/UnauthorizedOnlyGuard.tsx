import { VFC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectIsAuthorized } from 'src/store/auth/selectors';

export const UnauthorizedOnlyGuard: VFC = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
