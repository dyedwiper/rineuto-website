import React, { useEffect, useRef } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AboutPage from '../pages/AboutPage';
import ArchivePage from '../pages/ArchivePage';
import ContactPage from '../pages/ContactPage';
import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/LoginPage';
import NewsletterConfirmationPage from '../pages/NewsletterConfirmationPage';
import NewsletterPage from '../pages/NewsletterPage';
import NotFoundPage from '../pages/NotFoundPage';
import NoticesPage from '../pages/NoticesPage';
import PosterPage from '../pages/PosterPage';
import ProgramPage from '../pages/ProgramPage';
import ScreeningPage from '../pages/ScreeningPage';
import VokuPage from '../pages/VokuPage';
import AddNoticePage from '../pages/intern/AddNoticePage';
import AddScreeningPage from '../pages/intern/AddScreeningPage';
import AddSerialPage from '../pages/intern/AddSerialPage';
import EditNoticePage from '../pages/intern/EditNoticePage';
import EditScreeningPage from '../pages/intern/EditScreeningPage';
import EditSerialPage from '../pages/intern/EditSerialPage';
import RequireAuth from './RequireAuth';

export default function Main({ isNavOpen, setIsNavOpen }) {
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

  return (
    <MainStyled ref={mainElement} isNavOpen={isNavOpen} onClick={() => setIsNavOpen(false)}>
      <Switch>
        <Route exact path="/">
          <NoticesPage />
        </Route>
        <Route path="/program">
          <ProgramPage />
        </Route>
        <Route path="/screening">
          <ScreeningPage />
        </Route>
        <Route path="/archive">
          <ArchivePage />
        </Route>
        <Route path="/posters">
          <PosterPage />
        </Route>
        <Route path="/voku">
          <VokuPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/contact">
          <ContactPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/newsletter">
          <NewsletterPage />
        </Route>
        <Route exact path="/newsletter/confirmation">
          <NewsletterConfirmationPage />
        </Route>
        <Route path="/intern/editNotice">
          <RequireAuth>
            <EditNoticePage />
          </RequireAuth>
        </Route>
        <Route exact path="/intern/addNotice">
          <RequireAuth>
            <AddNoticePage />
          </RequireAuth>
        </Route>
        <Route path="/intern/editScreening">
          <RequireAuth>
            <EditScreeningPage />
          </RequireAuth>
        </Route>
        <Route exact path="/intern/addScreening">
          <RequireAuth>
            <AddScreeningPage />
          </RequireAuth>
        </Route>
        <Route path="/intern/editSerial">
          <RequireAuth>
            <EditSerialPage />
          </RequireAuth>
        </Route>
        <Route exact path="/intern/addSerial">
          <RequireAuth>
            <AddSerialPage />
          </RequireAuth>
        </Route>
        <Route path="/logout">
          <Redirect to="/" />
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
        <Route path="/404">
          <NotFoundPage />
        </Route>
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </MainStyled>
  );
}

const MainStyled = styled.main`
  overflow: auto;
  filter: ${(props) => (props.isNavOpen ? 'blur(1px)' : 'none')};

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
