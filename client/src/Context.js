import { createContext } from 'react';

const Context = createContext({
  user: {},
  setUser: () => {},
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
  isWaiting: false,
  setIsWaiting: () => {},
  isError: false,
  setIsError: () => {},
});

export default Context;
