import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthService } from './api/services/auth.service';

import { RootRouter } from './routes/RootRouter';
import { removeUser, saveUser } from './store/auth/slice';

export const App: React.VFC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.subscribeToAuthChange(user => {
      if (user) {
        dispatch(saveUser(user));
      } else {
        dispatch(removeUser());
      }
    });
  });

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Brrr... here should be your loader component</div>}>
        <RootRouter />
      </Suspense>
    </BrowserRouter>
  );
};
