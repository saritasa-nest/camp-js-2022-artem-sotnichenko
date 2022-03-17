import { LinearProgress } from '@mui/material';
import { useEffect, VFC } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthService } from 'src/api/services/auth.service';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectLoading } from 'src/store/auth/selectors';
import { setLoading, setUser } from 'src/store/auth/slice';

/** Show loading while first auth state is loading. */
export const AuthGuard: VFC = () => {
  const isLoading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = AuthService.subscribeToAuthChange(user => {
      dispatch(setUser(user));
      dispatch(setLoading(false));
    });
    return unsubscribe;
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }

  return <Outlet />;
};
