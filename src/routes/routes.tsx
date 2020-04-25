import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

interface ExtendedRouteProps extends RouteProps {
  isPrivate?: boolean;
  component: React.FunctionComponent;
}

const Page: React.FC<ExtendedRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...props
}) => {
  const { user } = useAuth();

  // true == true: private page and logged in, ok
  // true != false: private page and logged out, must signin
  // false != true: public page and logged in, go to dashboard
  // false == false: public page and logged out, ok

  return (
    <Route
      {...props}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Page;
