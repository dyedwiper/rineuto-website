import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoadingPage from '../pages/LoadingPage';
import Context from '../Context';

export default function PrivateRoute({ children, isLoadingUser }) {
  const { isUserLoggedIn } = useContext(Context);

  if (isLoadingUser) {
    return (
      <Route>
        <LoadingPage />
      </Route>
    );
  }

  return <Route>{isUserLoggedIn ? children : <Redirect to="/login" />}</Route>;
}
