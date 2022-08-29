import React, { useEffect, useRef, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import AboutPage from '../pages/AboutPage';
import ArchivePage from '../pages/ArchivePage';
import ContactPage from '../pages/ContactPage';
import ErrorPage from '../pages/ErrorPage';
import AddNoticePage from '../pages/intern/AddNoticePage';
import AddScreeningPage from '../pages/intern/AddScreeningPage';
import AddSerialPage from '../pages/intern/AddSerialPage';
import EditNoticePage from '../pages/intern/EditNoticePage';
import EditScreeningPage from '../pages/intern/EditScreeningPage';
import EditSerialPage from '../pages/intern/EditSerialPage';
import LoadingPage from '../pages/LoadingPage';
import LoginPage from '../pages/LoginPage';
import NewsletterConfirmationPage from '../pages/NewsletterConfirmationPage';
import NewsletterPage from '../pages/NewsletterPage';
import NotFoundPage from '../pages/NotFoundPage';
import NoticePage from '../pages/NoticePage';
import PosterPage from '../pages/PosterPage';
import ProgramPage from '../pages/ProgramPage';
import ScreeningPage from '../pages/ScreeningPage';
import VokuPage from '../pages/VokuPage';
import { getNotices, getScreenings, getSerials } from '../utils/services';
import PrivateRoute from './PrivateRoute';

export default function Main({
  isNavOpen,
  isLoadingUser,
  setIsLoadingUser,
  setIsLoadingContent,
  setIsNavOpen,
  isWaiting,
  setIsWaiting,
}) {
  const [screenings, setScreenings] = useState([]);
  const [serials, setSerials] = useState([]);
  const [notices, setNotices] = useState([]);
  const [isLoadingScreenings, setIsLoadingScreenings] = useState(true);
  const [isLoadingSerials, setIsLoadingSerials] = useState(true);
  const [isLoadingNotice, setIsLoadingNotices] = useState(true);
  const [isError, setIsError] = useState(false);
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
        const screeningsFormatted = formatScreenings(screenings);
        setScreenings(screeningsFormatted);
        setIsLoadingScreenings(false);
      })
      .catch(() => setIsError(true));
  }, [editedObject]);

  useEffect(() => {
    getSerials()
      .then((serials) => {
        setSerials(serials);
        setIsLoadingSerials(false);
      })
      .catch(() => setIsError(true));
  }, [editedObject]);

  useEffect(() => {
    getNotices()
      .then((notices) => {
        const noticesFormatted = formatNotices(notices);
        setNotices(noticesFormatted);
        setIsLoadingNotices(false);
      })
      .catch(() => setIsError(true));
  }, [editedObject]);

  useEffect(() => {
    setIsLoadingContent(isLoadingScreenings || isLoadingSerials || isLoadingNotice);
  }, [setIsLoadingContent, isLoadingScreenings, isLoadingSerials, isLoadingNotice]);

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoadingScreenings || isLoadingSerials || isLoadingNotice) {
    return <LoadingPage />;
  }

  return (
    <MainStyled ref={mainElement} isNavOpen={isNavOpen} onClick={() => setIsNavOpen(false)}>
      <Switch>
        <Route exact path="/">
          <NoticePage notices={notices} editedObject={editedObject} />
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
        <Route path="/dishes">
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
          <NewsletterPage isWaiting={isWaiting} setIsWaiting={setIsWaiting} setIsError={setIsError} />
        </Route>
        <Route exact path="/newsletter/confirmation">
          <NewsletterConfirmationPage />
        </Route>
        <PrivateRoute path="/intern/editNotice" isLoadingUser={isLoadingUser}>
          <EditNoticePage
            notices={notices}
            setEditedObject={setEditedObject}
            isWaiting={isWaiting}
            setIsWaiting={setIsWaiting}
          />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addNotice" isLoadingUser={isLoadingUser}>
          <AddNoticePage setEditedObject={setEditedObject} isWaiting={isWaiting} setIsWaiting={setIsWaiting} />
        </PrivateRoute>
        <PrivateRoute path="/intern/editScreening" isLoadingUser={isLoadingUser}>
          <EditScreeningPage
            screenings={screenings}
            serials={serials}
            setEditedObject={setEditedObject}
            isWaiting={isWaiting}
            setIsWaiting={setIsWaiting}
          />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addScreening" isLoadingUser={isLoadingUser}>
          <AddScreeningPage
            serials={serials}
            setEditedObject={setEditedObject}
            isWaiting={isWaiting}
            setIsWaiting={setIsWaiting}
          />
        </PrivateRoute>
        <PrivateRoute path="/intern/editSerial" isLoadingUser={isLoadingUser}>
          <EditSerialPage
            serials={serials}
            setEditedObject={setEditedObject}
            isWaiting={isWaiting}
            setIsWaiting={setIsWaiting}
          />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addSerial" isLoadingUser={isLoadingUser}>
          <AddSerialPage setEditedObject={setEditedObject} isWaiting={isWaiting} setIsWaiting={setIsWaiting} />
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
    return formattedScreenings;
  }

  function formatNotices(notices) {
    const formattedNotices = notices.map((notice) => {
      const textFormatted = notice.text.replace(/\\n/g, '\n');
      const dateFormatted = new Date(notice.date);
      return { ...notice, text: textFormatted, date: dateFormatted };
    });
    return formattedNotices;
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
