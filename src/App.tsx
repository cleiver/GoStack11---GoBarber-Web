import React from 'react';

import SignIn from './pages/SignIn';
import AppProviders from './hooks';

const App: React.FC = () => (
  <>
    <AppProviders>
      <SignIn />
    </AppProviders>
  </>
);

export default App;
