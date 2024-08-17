import React, { useContext, useEffect, useRef, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import Context from '../Context';
import AboutPage from '../pages/AboutPage';
import ArchivePage from '../pages/ArchivePage';
import ContactPage from '../pages/ContactPage';
import ErrorPage from '../pages/ErrorPage';
import LoadingPage from '../pages/LoadingPage';
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
import { getScreenings } from '../services/screeningServices';
import { getSerials } from '../services/serialServices';
import PrivateRoute from './PrivateRoute';

export default function Main({ isNavOpen, isLoadingUser, setIsLoadingUser, setIsNavOpen }) {
  const [screenings, setScreenings] = useState([]);
  const [serials, setSerials] = useState([]);
  const [isLoadingScreenings, setIsLoadingScreenings] = useState(true);
  const [isLoadingSerials, setIsLoadingSerials] = useState(true);
  const [editedObject, setEditedObject] = useState({});

  const { isError, setIsError } = useContext(Context);

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
      .then((res) => {
        const screeningsFormatted = formatScreenings(res.data);
        setScreenings(screeningsFormatted);
        setIsLoadingScreenings(false);
      })
      .catch(() => setIsError(true));
  }, [editedObject]);

  useEffect(() => {
    getSerials()
      .then((res) => {
        setSerials(res.data);
        setIsLoadingSerials(false);
      })
      .catch(() => setIsError(true));
  }, [editedObject]);

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoadingScreenings || isLoadingSerials) {
    return <LoadingPage />;
  }

  return (
    <MainStyled ref={mainElement} isNavOpen={isNavOpen} onClick={() => setIsNavOpen(false)}>
      <Switch>
        <Route exact path="/">
          <NoticesPage editedObject={editedObject} />
        </Route>
        <Route path="/program">
          <ProgramPage
            screenings={screenings.filter((screening) => screening.date >= Date.now())}
            editedObject={editedObject}
          />
        </Route>
        <Route path="/screening">
          <ScreeningPage screenings={screenings} editedObject={editedObject} />
        </Route>
        <Route path="/archive">
          <ArchivePage screenings={screenings.filter((screening) => screening.date < Date.now())} />
        </Route>
        <Route path="/posters">
          <PosterPage editedObject={editedObject} />
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
          <LoginPage setIsLoadingUser={setIsLoadingUser} />
        </Route>
        <Route exact path="/newsletter">
          <NewsletterPage setIsError={setIsError} />
        </Route>
        <Route exact path="/newsletter/confirmation">
          <NewsletterConfirmationPage />
        </Route>
        <PrivateRoute path="/intern/editNotice" isLoadingUser={isLoadingUser}>
          <EditNoticePage setEditedObject={setEditedObject} />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addNotice" isLoadingUser={isLoadingUser}>
          <AddNoticePage setEditedObject={setEditedObject} />
        </PrivateRoute>
        <PrivateRoute path="/intern/editScreening" isLoadingUser={isLoadingUser}>
          <EditScreeningPage screenings={screenings} serials={serials} setEditedObject={setEditedObject} />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addScreening" isLoadingUser={isLoadingUser}>
          <AddScreeningPage serials={serials} setEditedObject={setEditedObject} />
        </PrivateRoute>
        <PrivateRoute path="/intern/editSerial" isLoadingUser={isLoadingUser}>
          <EditSerialPage setEditedObject={setEditedObject} />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addSerial" isLoadingUser={isLoadingUser}>
          <AddSerialPage setEditedObject={setEditedObject} />
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

  function formatScreenings(screenings) {
    const formattedScreenings = screenings.map((screening) => {
      const dateFormatted = new Date(screening.date);
      return { ...screening, date: dateFormatted };
    });
    return formattedScreenings;
  }
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
