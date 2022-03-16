import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';

export const App: React.VFC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<div>Brrr... here should be your loader component</div>}>
        <RootRouter />
      </Suspense>
    </BrowserRouter>
  </Provider>
);
