import React, { useEffect, useRef, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import AboutPage from '../pages/AboutPage';
import ArchivePage from '../pages/ArchivePage';
import InternPage from '../pages/InternPage';
import LoginPage from '../pages/LoginPage';
import ProgramPage from '../pages/ProgramPage';
import ScreeningPage from '../pages/ScreeningPage';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from './NotFoundPage';
import ImprintPage from '../pages/ImprintPage';
import PosterPage from '../pages/PosterPage';
import HomePage from '../pages/HomePage';
import LoadingPage from '../pages/LoadingPage';
import { getScreenings } from '../utils/services';

export default function Main({ isNavOpen, isLoadingUser, setIsNavOpen }) {
  const [screenings, setScreenings] = useState([]);
  const [isLoadingScreenings, setIsLoadingScreenings] = useState(true);

  const history = useHistory();
  const mainElement = useRef(null);

  useEffect(() => {
    const unlisten = history.listen(() => {
      if (mainElement.current) {
        mainElement.current.scrollTop = 0;
      }
    });
    return unlisten;
  }, [history]);

  useEffect(() => {
    getScreenings()
      .then((screenings) => {
        const screeningsFormatted = screenings.map((screening) => {
          const dateFormatted = new Date(screening.date);
          return { ...screening, date: dateFormatted };
        });
        setScreenings(screeningsFormatted);
        setIsLoadingScreenings(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoadingScreenings) {
    return <LoadingPage />;
  }

  return (
    <MainStyled
      ref={mainElement}
      isNavOpen={isNavOpen}
      onClick={() => setIsNavOpen()}
    >
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/program">
          <ProgramPage screenings={screenings} />
        </Route>
        <Route path="/screening">
          <ScreeningPage screenings={screenings} />
        </Route>
        <Route path="/archive">
          <ArchivePage screenings={screenings} />
        </Route>
        <Route path="/posters">
          <PosterPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/imprint">
          <ImprintPage />
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
        <Route path="/404">
          <NotFoundPage />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </MainStyled>
  );
}

const MainStyled = styled.main`
  overflow: auto;
  filter: ${(props) => (props.isNavOpen ? 'blur(4px)' : 'none')};

  transition: filter 2.3s linear;

  @media (max-width: 900px) {
    * {
      pointer-events: ${(props) => (props.isNavOpen ? 'none' : 'auto')};
    }
  }

  @media (min-width: 900px) {
    grid-template-columns: 240px auto;
    filter: none;
  }
`;
