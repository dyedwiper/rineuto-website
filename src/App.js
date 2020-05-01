import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components/macro';
import blackPerlImage from './assets/blackPerl.png';
import Header from './common/Header';
import Main from './common/Main';
import Navigation from './common/Navigation';
import UserContext from './userContext';
import { getUser } from './utils/services';
import { getFromStorage } from './utils/storage';

export default function App() {
  const [user, setUser] = useState({});
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const token = getFromStorage('rineuto-token');
    getUser(token)
      .then((user) => {
        console.log('getUser called');
        setUser(user);
      })
      .then(() => {
        setIsLoadingUser(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoadingUser(false);
      });
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <AppStyled>
          <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          <Navigation isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          <Main
            isNavOpen={isNavOpen}
            onClick={() => setIsNavOpen(false)}
            isLoadingUser={isLoadingUser}
          />
        </AppStyled>
      </UserContext.Provider>
    </Router>
  );
}

const AppStyled = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: 1020px;
  height: 100%;
  display: grid;
  grid-template-rows: 60px auto;
  margin: auto;
  background-image: url(${blackPerlImage});
  background-color: black;

  @media (min-width: 900px) {
    grid-template-columns: 240px auto;
  }
`;
