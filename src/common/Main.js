import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';
import PrivateRoute from './PrivateRoute';
import AboutPage from '../pages/AboutPage';
import ArchivePage from '../pages/ArchivePage';
import ProgramPage from '../pages/ProgramPage';
import InternPage from '../pages/InternPage';
import LoginPage from '../pages/LoginPage';
import ScreeningPage from '../pages/ScreeningPage';

export default function Main({ isNavOpen, isLoadingUser }) {
  return (
    <MainStyled isNavOpen={isNavOpen}>
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
