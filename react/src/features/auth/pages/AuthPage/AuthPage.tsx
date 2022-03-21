import { memo, useCallback, VFC } from 'react';
import {
  Button, Stack, Typography,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { signInWithGoogle } from 'src/store/auth/dispatchers';
import { useAppDispatch } from 'src/store';

const AuthPageComponent: VFC = () => {
  const dispatch = useAppDispatch();

  const handleGoogleSignInClick = useCallback(() => dispatch(signInWithGoogle()), [dispatch]);

  return (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <Typography
        component="h2"
        variant="h5"
        fontWeight="bold"
      >
        Sign in with socials
      </Typography>
      <Button
        onClick={handleGoogleSignInClick}
        startIcon={<Google />}
        variant="outlined"
      >
        Continue with google
      </Button>
    </Stack>
  );
};

export const AuthPage = memo(AuthPageComponent);
