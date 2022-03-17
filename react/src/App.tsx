import { Suspense, VFC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LinearProgress } from '@mui/material';
import { store } from './store';
import { RootRouter } from './routes/RootRouter';

export const App: VFC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<LinearProgress />}>
        <RootRouter />
      </Suspense>
    </Provider>
  </BrowserRouter>
);
