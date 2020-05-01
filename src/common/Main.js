import React, { useEffect, useRef } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import AboutPage from '../pages/AboutPage';
import ArchivePage from '../pages/ArchivePage';
import InternPage from '../pages/InternPage';
import LoginPage from '../pages/LoginPage';
import ProgramPage from '../pages/ProgramPage';
import ScreeningPage from '../pages/ScreeningPage';
import PrivateRoute from './PrivateRoute';

export default function Main({ isNavOpen, isLoadingUser, setIsNavOpen }) {
  let history = useHistory();
  const mainElement = useRef(null);

  useEffect(() => {
    history.listen(() => {
      mainElement.current.scrollTop = 0;
    });
  }, [history]);

  return (
    <MainStyled
      ref={mainElement}
      isNavOpen={isNavOpen}
      onClick={() => setIsNavOpen()}
    >
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
