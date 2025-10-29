import React, { useRef } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
  const mainElement = useRef(null);

  return (
    <MainStyled ref={mainElement} isNavOpen={isNavOpen} onClick={() => setIsNavOpen(false)}>
      <Routes>
        <Route path="/" element={<NoticesPage />} />
        <Route path="/program" element={<ProgramPage />} />
        <Route path="/screening/:id" element={<ScreeningPage />} />
        <Route path="/archive/*" element={<ArchivePage />} />
        <Route path="/posters/*" element={<PosterPage />} />
        <Route path="/voku" element={<VokuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/newsletter/confirmation" element={<NewsletterConfirmationPage />} />
        <Route
          path="/intern/editNotice/*"
          element={
            <RequireAuth>
              <EditNoticePage />
            </RequireAuth>
          }
        />
        <Route
          path="/intern/addNotice"
          element={
            <RequireAuth>
              <AddNoticePage />
            </RequireAuth>
          }
        />
        <Route
          path="/intern/editScreening/*"
          element={
            <RequireAuth>
              <EditScreeningPage />
            </RequireAuth>
          }
        />
        <Route
          path="/intern/addScreening"
          element={
            <RequireAuth>
              <AddScreeningPage />
            </RequireAuth>
          }
        />
        <Route
          path="/intern/editSerial/*"
          element={
            <RequireAuth>
              <EditSerialPage />
            </RequireAuth>
          }
        />
        <Route
          path="/intern/addSerial"
          element={
            <RequireAuth>
              <AddSerialPage />
            </RequireAuth>
          }
        />
        <Route path="/logout" element={<Navigate to="/" />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
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
