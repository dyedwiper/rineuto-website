import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import styled from 'styled-components/macro';
import blackPerlsImage from './assets/blackPerls.png';
import Header from './common/Header';
import ScreeningPage from './pages/ScreeningPage';
import { getScreenings } from './utils/services';
import AboutPage from './pages/AboutPage';
import ArchivePage from './pages/ArchivePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AddScreeningPage from './pages/AddScreeningPage';

export default function App() {
  const [screenings, setScreenings] = useState([]);
  const [selectedScreening, setSelectedScreening] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      .catch(console.error);
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
        <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
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
          <Route exact path="/intern">
            <LoginPage />
          </Route>
          <PrivateRoute path="/intern/addScreening" isLoggedIn={isLoggedIn}>
            <AddScreeningPage />
          </PrivateRoute>
        </Switch>
      </AppStyled>
    </Router>
  );
}

function PrivateRoute({ children, isLoggedIn, ...rest }) {
  return (
    <Route {...rest}>{isLoggedIn ? children : <Redirect to="/intern" />}</Route>
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
