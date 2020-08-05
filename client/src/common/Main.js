import React, { useEffect, useRef, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import AboutPage from '../pages/AboutPage';
import ArchivePage from '../pages/ArchivePage';
import ImprintPage from '../pages/ContactPage';
import HomePage from '../pages/HomePage';
import AddNoticePage from '../pages/intern/AddNoticePage';
import AddScreeningPage from '../pages/intern/AddScreeningPage';
import AddSerialPage from '../pages/intern/AddSerialPage';
import EditNoticePage from '../pages/intern/EditNoticePage';
import EditScreeningPage from '../pages/intern/EditScreeningPage';
import EditSerialPage from '../pages/intern/EditSerialPage';
import LoadingPage from '../pages/LoadingPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PosterPage from '../pages/PosterPage';
import ProgramPage from '../pages/ProgramPage';
import ScreeningPage from '../pages/ScreeningPage';
import { getNotices, getScreenings, getSerials } from '../utils/services';
import PrivateRoute from './PrivateRoute';

export default function Main({ isNavOpen, isLoadingUser, setIsLoadingContent, setIsNavOpen, setIsWaiting }) {
  const [screenings, setScreenings] = useState([]);
  const [serials, setSerials] = useState([]);
  const [notices, setNotices] = useState([]);
  const [isLoadingScreenings, setIsLoadingScreenings] = useState(true);
  const [isLoadingSerials, setIsLoadingSerials] = useState(true);
  const [isLoadingNotice, setIsLoadingNotices] = useState(true);
  const [editedObject, setEditedObject] = useState({});

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
          let synopsisFormatted = '';
          if (screening.synopsis) {
            synopsisFormatted = screening.synopsis.replace(/\\n/g, '\n');
          }
          return {
            ...screening,
            date: dateFormatted,
            synopsis: synopsisFormatted,
          };
        });
        setScreenings(screeningsFormatted);
        setIsLoadingScreenings(false);
      })
      .catch((err) => console.error(err));
  }, [editedObject]);

  useEffect(() => {
    getSerials()
      .then((serials) => {
        setSerials(serials);
        setIsLoadingSerials(false);
      })
      .catch((err) => console.error(err));
  }, [editedObject]);

  useEffect(() => {
    getNotices()
      .then((notices) => {
        const noticesFormatted = notices.map((notice) => {
          const textFormatted = notice.text.replace(/\\n/g, '\n');
          const dateFormatted = new Date(notice.date);
          return { ...notice, text: textFormatted, date: dateFormatted };
        });
        setNotices(noticesFormatted);
        setIsLoadingNotices(false);
      })
      .catch((err) => console.error(err));
  }, [editedObject]);

  useEffect(() => {
    setIsLoadingContent(isLoadingScreenings || isLoadingSerials || isLoadingNotice);
  }, [setIsLoadingContent, isLoadingScreenings, isLoadingSerials, isLoadingNotice]);

  if (isLoadingScreenings || isLoadingSerials || isLoadingNotice) {
    return <LoadingPage />;
  }

  return (
    <MainStyled ref={mainElement} isNavOpen={isNavOpen} onClick={() => setIsNavOpen(false)}>
      <Switch>
        <Route exact path="/">
          <HomePage notices={notices} editedObject={editedObject} />
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
          <PosterPage serials={serials} editedObject={editedObject} />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/contact">
          <ImprintPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/intern/editNotice" isLoadingUser={isLoadingUser}>
          <EditNoticePage notices={notices} setEditedObject={setEditedObject} setIsWaiting={setIsWaiting} />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addNotice" isLoadingUser={isLoadingUser}>
          <AddNoticePage setEditedObject={setEditedObject} setIsWaiting={setIsWaiting} />
        </PrivateRoute>
        <PrivateRoute path="/intern/editScreening" isLoadingUser={isLoadingUser}>
          <EditScreeningPage
            screenings={screenings}
            serials={serials}
            setEditedObject={setEditedObject}
            setIsWaiting={setIsWaiting}
          />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addScreening" isLoadingUser={isLoadingUser}>
          <AddScreeningPage serials={serials} setEditedObject={setEditedObject} setIsWaiting={setIsWaiting} />
        </PrivateRoute>
        <PrivateRoute path="/intern/editSerial" isLoadingUser={isLoadingUser}>
          <EditSerialPage serials={serials} setEditedObject={setEditedObject} setIsWaiting={setIsWaiting} />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addSerial" isLoadingUser={isLoadingUser}>
          <AddSerialPage setEditedObject={setEditedObject} setIsWaiting={setIsWaiting} />
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
