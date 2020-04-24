import React from 'react';

import SignIn from './pages/SignIn';
import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <AuthProvider>
    <SignIn />
  </AuthProvider>
);

export default App;
