import { createContext } from 'react';

const Context = createContext({
  user: {},
  setUser: () => {},
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
});

export default Context;
