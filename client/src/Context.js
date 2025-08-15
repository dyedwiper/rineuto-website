import { createContext } from 'react';

const Context = createContext({
  user: {},
  setUser: () => {},
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
  isWaiting: false,
  setIsWaiting: () => {},
});

export default Context;
