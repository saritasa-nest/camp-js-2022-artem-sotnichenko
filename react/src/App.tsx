import { Suspense, VFC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { RootRouter } from './routes/RootRouter';
import { store } from './store';

export const App: VFC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<LinearProgress />}>
        <RootRouter />
      </Suspense>
    </BrowserRouter>
  </Provider>
);
