import React, { useEffect, useRef, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import AboutPage from '../pages/AboutPage';
import ArchivePage from '../pages/ArchivePage';
import HomePage from '../pages/HomePage';
import ImprintPage from '../pages/ImprintPage';
import AddScreeningPage from '../pages/intern/AddScreeningPage';
import AddSeriesPage from '../pages/intern/AddSeriesPage';
import EditScreeningPage from '../pages/intern/EditScreeningPage';
import EditSeriesPage from '../pages/intern/EditSeriesPage';
import LoadingPage from '../pages/LoadingPage';
import LoginPage from '../pages/LoginPage';
import PosterPage from '../pages/PosterPage';
import ProgramPage from '../pages/ProgramPage';
import ScreeningPage from '../pages/ScreeningPage';
import { getScreenings, getSeries, getNews } from '../utils/services';
import NotFoundPage from './NotFoundPage';
import PrivateRoute from './PrivateRoute';
import AddNewsPage from '../pages/intern/AddNewsPage';
import EditNewsPage from '../pages/intern/EditNewsPage';

export default function Main({ isNavOpen, isLoadingUser, setIsNavOpen }) {
  const [screenings, setScreenings] = useState([]);
  const [series, setSeries] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoadingScreenings, setIsLoadingScreenings] = useState(true);
  const [isLoadingSeries, setIsLoadingSeries] = useState(true);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [hasBeenEdited, setHasBeenEdited] = useState(false);

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
  }, []);

  useEffect(() => {
    getSeries()
      .then((series) => {
        setSeries(series);
        setIsLoadingSeries(false);
      })
      .catch((err) => console.error(err));
  }, []);

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
  }, []);

  if (isLoadingScreenings || isLoadingSeries || isLoadingNews) {
    return <LoadingPage />;
  }

  return (
    <MainStyled ref={mainElement} isNavOpen={isNavOpen} onClick={() => setIsNavOpen()}>
      <Switch>
        <Route exact path="/">
          <HomePage news={news} />
        </Route>
        <Route path="/program">
          <ProgramPage screenings={screenings} />
        </Route>
        <Route path="/screening">
          <ScreeningPage screenings={screenings} hasBeenEdited={hasBeenEdited} setHasBeenEdited={setHasBeenEdited} />
        </Route>
        <Route path="/archive">
          <ArchivePage screenings={screenings} />
        </Route>
        <Route path="/posters">
          <PosterPage series={series} />
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
          <EditNewsPage news={news} setHasBeenEdited={setHasBeenEdited} />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addNews" isLoadingUser={isLoadingUser}>
          <AddNewsPage />
        </PrivateRoute>
        <PrivateRoute path="/intern/editScreening" isLoadingUser={isLoadingUser}>
          <EditScreeningPage screenings={screenings} series={series} setHasBeenEdited={setHasBeenEdited} />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addScreening" isLoadingUser={isLoadingUser}>
          <AddScreeningPage series={series} />
        </PrivateRoute>
        <PrivateRoute path="/intern/editSeries" isLoadingUser={isLoadingUser}>
          <EditSeriesPage series={series} setHasBeenEdited={setHasBeenEdited} />
        </PrivateRoute>
        <PrivateRoute exact path="/intern/addSeries" isLoadingUser={isLoadingUser}>
          <AddSeriesPage />
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
