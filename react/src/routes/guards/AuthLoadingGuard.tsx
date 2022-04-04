import { useEffect, VFC } from 'react';
import { LinearProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchUser } from 'src/store/auth/dispatchers';
import { selectAuthLoading } from 'src/store/auth/selectors';

/**
 * Auth loading guard.
 */
export const AuthLoadingGuard: VFC = () => {
  const dispatch = useAppDispatch();
  const isAuthLoading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isAuthLoading) {
    return <LinearProgress />;
  }

  return <Outlet />;
};
