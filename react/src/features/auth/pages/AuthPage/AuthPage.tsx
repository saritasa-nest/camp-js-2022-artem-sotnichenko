import { memo, useCallback, VFC } from 'react';
import {
  Button, Stack, Typography,
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { signInWithGoogle } from 'src/store/auth/dispatchers';
import { useAppDispatch } from 'src/store';
import cls from './AuthPage.module.css';

const AuthPageComponent: VFC = () => {
  const dispatch = useAppDispatch();

  const handleGoogleSignInClick = useCallback(() => dispatch(signInWithGoogle()), [dispatch]);

  return (
    <Stack className={cls['auth-page']}>
      <Typography
        component="h2"
        variant="h5"
        className={cls.title}
      >
        Sign in with socials
      </Typography>
      <Button
        onClick={handleGoogleSignInClick}
        startIcon={<GoogleIcon />}
        variant="outlined"
      >
        Continue with google
      </Button>
    </Stack>
  );
};

export const AuthPage = memo(AuthPageComponent);
