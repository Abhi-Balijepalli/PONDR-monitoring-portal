import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
function UnprotectedRoute ({ children, ...rest }) {
  const auth = useSelector(state => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => auth.isLoaded && auth.isEmpty
        ? (
            children
          )
        : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
          )}
    />
  );
}

export default UnprotectedRoute;
