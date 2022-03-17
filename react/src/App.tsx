import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { RootRouter } from './routes/RootRouter';

export const App: React.VFC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<div>Brrr... here should be your loader component</div>}>
        <RootRouter />
      </Suspense>
    </Provider>
  </BrowserRouter>
);
