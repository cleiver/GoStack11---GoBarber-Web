import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Page from './routes';

// encapsulating routes to centralize the auth check

const Routes: React.FC = () => (
  <Switch>
    <Page path="/" exact component={SignIn} />
    <Page path="/signup" component={SignUp} />
    <Page path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
