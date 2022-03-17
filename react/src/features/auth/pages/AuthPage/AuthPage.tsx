import { memo, VFC } from 'react';
import {
  Button, Stack, Typography,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthService } from 'src/api/services/auth.service';

const AuthPageComponent: VFC = () => {
  const handleGoogleClick = AuthService.signInWithGoogle;

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography
        component="h2"
        variant="h5"
        fontWeight="bold"
      >
        Sign in with socials
      </Typography>
      <Button
        onClick={handleGoogleClick}
        startIcon={<Google />}
        variant="outlined"
      >
        Continue with google
      </Button>
    </Stack>
  );
};

export const AuthPage = memo(AuthPageComponent);
