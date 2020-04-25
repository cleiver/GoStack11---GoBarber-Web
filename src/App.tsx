import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProviders from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProviders>
      <Routes />
    </AppProviders>
  </BrowserRouter>
);

export default App;
