import React, { useEffect, useRef, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import AboutPage from '../pages/AboutPage';
import ArchivePage from '../pages/ArchivePage';
import HomePage from '../pages/HomePage';
import ImprintPage from '../pages/ImprintPage';
import AddNewsPage from '../pages/intern/AddNewsPage';
import AddScreeningPage from '../pages/intern/AddScreeningPage';
import AddSerialPage from '../pages/intern/AddSerialPage';
import EditNewsPage from '../pages/intern/EditNewsPage';
import EditScreeningPage from '../pages/intern/EditScreeningPage';
import EditSerialPage from '../pages/intern/EditSerialPage';
import LoadingPage from '../pages/LoadingPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PosterPage from '../pages/PosterPage';
import ProgramPage from '../pages/ProgramPage';
import ScreeningPage from '../pages/ScreeningPage';
import { getNews, getScreenings, getSerials } from '../utils/services';
import PrivateRoute from './PrivateRoute';

export default function Main({ isNavOpen, isLoadingUser, setIsNavOpen }) {
  const [screenings, setScreenings] = useState([]);
  const [serials, setSerials] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoadingScreenings, setIsLoadingScreenings] = useState(true);
  const [isLoadingSerials, setIsLoadingSerials] = useState(true);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
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
    getNews()
      .then((news) => {
        const newsFormatted = news.map((newsItem) => {
          const textFormatted = newsItem.text.replace(/\\n/g, '\n');
          const dateFormatted = new Date(newsItem.date);
          return { ...newsItem, text: textFormatted, date: dateFormatted };
        });
        setNews(newsFormatted);
        setIsLoadingNews(false);
      })
      .catch((err) => console.error(err));
  }, [editedObject]);

  if (isLoadingScreenings || isLoadingSerials || isLoadingNews) {
    return <LoadingPage />;
  }

  return (
    <MainStyled ref={mainElement} isNavOpen={isNavOpen} onClick={() => setIsNavOpen()}>
      <Switch>
        <Route exact path="/">
          <HomePage news={news} editedObject={editedObject} />
        </Route>
        <Route path="/program">
          <ProgramPage screenings={screenings} editedObject={editedObject} />
        </Route>
        <Route path="/screening">
          <ScreeningPage screenings={screenings} editedObject={editedObject} />
        </Route>
        <Route path="/archive">
          <ArchivePage screenings={screenings} />
        </Route>
        <Route path="/posters">
          <PosterPage serials={serials} editedObject={editedObject} />
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
        <PrivateRoute path="/intern/editNews" isLoadingUser={isLoadingUser}>
          <EditNewsPage news={news} setEditedObject={setEditedObject} />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addNews" isLoadingUser={isLoadingUser}>
          <AddNewsPage setEditedObject={setEditedObject} />
        </PrivateRoute>
        <PrivateRoute path="/intern/editScreening" isLoadingUser={isLoadingUser}>
          <EditScreeningPage screenings={screenings} serials={serials} setEditedObject={setEditedObject} />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addScreening" isLoadingUser={isLoadingUser}>
          <AddScreeningPage serials={serials} setEditedObject={setEditedObject} />
        </PrivateRoute>
        <PrivateRoute path="/intern/editSerial" isLoadingUser={isLoadingUser}>
          <EditSerialPage serials={serials} setEditedObject={setEditedObject} />
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
