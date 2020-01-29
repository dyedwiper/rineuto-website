import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components/macro';
import blackPerlsImage from './assets/blackPerls.png';
import Header from './common/Header';
import PrivateRoute from './common/PrivateRoute';
import AboutPage from './pages/AboutPage';
import ArchivePage from './pages/ArchivePage';
import HomePage from './pages/HomePage';
import InternPage from './pages/InternPage';
import LoginPage from './pages/LoginPage';
import ScreeningPage from './pages/ScreeningPage';
import { getScreenings, getVerifyToken } from './utils/services';
import { getFromStorage } from './utils/storage';

export default function App() {
  const [screenings, setScreenings] = useState([]);
  const [selectedScreening, setSelectedScreening] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const token = getFromStorage('rineuto-token');
    getVerifyToken(token)
      .then(() => {
        setIsLoggedIn(true);
      })
      .then(() => {
        setIsLoadingUser(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoadingUser(false);
      });
  }, []);

  useEffect(() => {
    getScreenings()
      .then(screenings => {
        const screeningsFormatted = screenings.map(screening => {
          const dateFormatted = new Date(screening.date);
          return { ...screening, date: dateFormatted };
        });
        setScreenings(screeningsFormatted);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const currentUrl = window.location;
    if (
      !isLoading &&
      currentUrl.pathname === '/screening' &&
      Object.entries(selectedScreening).length === 0 &&
      selectedScreening.constructor === Object
    ) {
      const currentScreeningId = currentUrl.search.slice(4);
      const currentScreening = screenings.find(
        screening => screening._id === currentScreeningId
      );
      setSelectedScreening(currentScreening);
    }
  }, [isLoading, screenings, selectedScreening]);

  return (
    <Router>
      <AppStyled>
        <Header
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          isLoggedIn={isLoggedIn}
        />
        <Switch>
          <Route exact path="/">
            <HomePage
              screenings={screenings}
              setSelectedScreening={setSelectedScreening}
            />
          </Route>
          <Route path="/screening">
            {Object.entries(selectedScreening).length && (
              <ScreeningPage selectedScreening={selectedScreening} />
            )}
          </Route>
          <Route path="/archive">
            <ArchivePage
              screenings={screenings}
              setSelectedScreening={setSelectedScreening}
            />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/intern/login">
            <LoginPage setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <PrivateRoute
            exact
            path="/intern"
            isLoadingUser={isLoadingUser}
            isLoggedIn={isLoggedIn}
          >
            <InternPage />
          </PrivateRoute>
        </Switch>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;

  display: grid;
  grid-template-rows: 48px auto;
  background-image: url(${blackPerlsImage});
  background-color: black;
`;
