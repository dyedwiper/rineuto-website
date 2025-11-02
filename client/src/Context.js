import { createContext } from 'react';

const Context = createContext({
  user: {},
  setUser: () => {},
  isLoadingUser: true,
  setIsLoadingUser: () => {},
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
  isWaiting: false,
  setIsWaiting: () => {},
});

export default Context;
