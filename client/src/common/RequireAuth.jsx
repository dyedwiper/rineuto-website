import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../Context';
import LoadingPage from '../pages/LoadingPage';

export default function RequireAuth({ children }) {
  const { isLoadingUser, isUserLoggedIn } = useContext(Context);

  if (isLoadingUser) {
    return <LoadingPage />;
  }

  return isUserLoggedIn ? children : <Redirect to="/login" />;
}
