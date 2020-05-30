import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Page from './routes';

// encapsulating routes to centralize the auth check

const Routes: React.FC = () => (
  <Switch>
    <Page path="/" exact component={SignIn} />
    <Page path="/signup" component={SignUp} />
    <Page path="/forgot-password" component={ForgotPassword} />
    <Page path="/reset-password" component={ResetPassword} />
    <Page path="/dashboard" component={Dashboard} isPrivate />
    <Page path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
