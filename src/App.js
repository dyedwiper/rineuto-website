import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components/macro';
import blackPerlImage from './assets/blackPerl.png';
import Header from './common/Header';
import Navigation from './common/Navigation';
import PrivateRoute from './common/PrivateRoute';
import AboutPage from './pages/AboutPage';
import ArchivePage from './pages/ArchivePage';
import ProgramPage from './pages/ProgramPage';
import InternPage from './pages/InternPage';
import LoginPage from './pages/LoginPage';
import ScreeningPage from './pages/ScreeningPage';
import { getUser } from './utils/services';
import { getFromStorage } from './utils/storage';
import UserContext from './userContext';

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
          <MainStyled isNavOpen={isNavOpen} onClick={() => setIsNavOpen(false)}>
            <Switch>
              <Route exact path="/">
                <ProgramPage />
              </Route>
              <Route path="/screening">
                <ScreeningPage />
              </Route>
              <Route path="/archive">
                <ArchivePage />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route exact path="/intern/login">
                <LoginPage />
              </Route>
              <PrivateRoute exact path="/intern" isLoadingUser={isLoadingUser}>
                <InternPage />
              </PrivateRoute>
              <Route path="/logout">
                <Redirect exact to="/" />
              </Route>
            </Switch>
          </MainStyled>
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

const MainStyled = styled.main`
  overflow: auto;
  filter: ${(props) => (props.isNavOpen ? 'blur(4px)' : 'none')};

  * {
    pointer-events: ${(props) => (props.isNavOpen ? 'none' : 'auto')};
  }

  @media (min-width: 900px) {
    grid-template-columns: 240px auto;
    filter: none;

    * {
      pointer-events: auto;
    }
  }
`;
