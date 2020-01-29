import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoadingPage from '../pages/LoadingPage';

export default function PrivateRoute({
  children,
  isLoggedIn,
  isLoadingUser,
  ...rest
}) {
  console.log('loading user', isLoadingUser, 'logged in', isLoggedIn);
  if (isLoadingUser) {
    return (
      <Route>
        <LoadingPage />
      </Route>
    );
  }
  return (
    <Route {...rest}>
      {isLoggedIn ? children : <Redirect to="/intern/login" />}
    </Route>
  );
}
