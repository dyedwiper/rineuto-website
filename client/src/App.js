import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components/macro';
import blackPerlImage from './assets/perls/blackPerl.png';
import Header from './common/Header';
import Main from './common/Main';
import Navigation from './common/Navigation';
import UserContext from './userContext';
import { authenticateUser } from './utils/services';
import { getFromStorage } from './utils/storage';
import LeftCurtain from './common/LeftCurtain';
import RightCurtain from './common/RightCurtain';

export default function App() {
  const [user, setUser] = useState({});
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', () => setScreenWidth(document.body.clientWidth));
    setScreenWidth(document.body.clientWidth);
  }, [isLoadingContent]);

  useEffect(() => {
    const token = getFromStorage('rineuto-token');
    if (token) {
      authenticateUser(token)
        .then((user) => {
          setUser(user);
        })
        .then(() => {
          setIsLoadingUser(false);
        })
        .catch(() => {
          setIsLoadingUser(false);
        });
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <AppStyled>
          {isWaiting && <OverlayStyled />}
          <LeftCurtain screenWidth={screenWidth} />
          <ScreenStyled>
            <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
            <Navigation isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
            <Main
              isNavOpen={isNavOpen}
              setIsNavOpen={setIsNavOpen}
              isLoadingUser={isLoadingUser}
              setIsLoadingContent={setIsLoadingContent}
              setIsWaiting={setIsWaiting}
            />
          </ScreenStyled>
          <RightCurtain screenWidth={screenWidth} />
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
`;

const ScreenStyled = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 60px auto;
  height: 100%;
  max-width: 1020px;
  margin: auto;
  background-image: url(${blackPerlImage});

  @media (min-width: 900px) {
    grid-template-columns: 240px auto;
  }
`;

const OverlayStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  opacity: 0;
  cursor: wait;
`;
