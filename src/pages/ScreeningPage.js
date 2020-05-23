import React, { useEffect, useState, useContext } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import DateRibbon from '../common/DateRibbon';
import LoadingPage from './LoadingPage';
import UserContext from '../userContext';
import { getSingleScreening } from '../utils/services';

export default function ScreeningPage({
  screenings,
  hasBeenEdited,
  setHasBeenEdited,
}) {
  const [selectedScreening, setSelectedScreening] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidId, setIsInvalidId] = useState(false);

  const { user } = useContext(UserContext);
  const loggedIn = Object.keys(user).length !== 0;

  let history = useHistory();

  useEffect(() => {
    const screeningId = window.location.pathname.slice(-24);
    const screening = screenings.find(
      (screening) => screening._id === screeningId
    );
    if (!screening) {
      setIsInvalidId(true);
    }
    setSelectedScreening(screening);
    if (hasBeenEdited) {
      getSingleScreening(screeningId)
        .then((editedScreening) => {
          const dateFormatted = new Date(editedScreening.date);
          setSelectedScreening({ ...editedScreening, date: dateFormatted });
        })
        .catch((err) => console.error(err));
    }
    setIsLoading(false);
  }, [screenings, hasBeenEdited]);

  useEffect(() => {
    if (!isInvalidId) {
      document.title = selectedScreening.title + ' | Rineuto Lichtspiele';
    }
  }, [selectedScreening, isInvalidId]);

  useEffect(() => {
    return () => setHasBeenEdited(false);
  }, [setHasBeenEdited]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isInvalidId) {
    return <Redirect to="/404" />;
  }

  return (
    <ScreeningPageStyled>
      {hasBeenEdited && <EditNoteStyled>Änderungen übernommen</EditNoteStyled>}
      <BackButtonStyled onClick={history.goBack}>Zurück</BackButtonStyled>
      <DateRibbon date={selectedScreening.date} />
      <FilmStillStyled
        src={process.env.PUBLIC_URL + selectedScreening.imageUrl}
      />
      <ScreeningTitleStyled>{selectedScreening.title}</ScreeningTitleStyled>
      <FilmInfoStyled>
        {selectedScreening.country +
          ' ' +
          selectedScreening.year +
          ' | ' +
          selectedScreening.length +
          ' Min | ' +
          selectedScreening.version}
      </FilmInfoStyled>
      <FilmDirectorStyled>
        {'Regie: ' + selectedScreening.director}
      </FilmDirectorStyled>
      <FilmSynopsisStyled>{selectedScreening.synopsis}</FilmSynopsisStyled>
      <ScreeningSeriesStyled>
        Filmreihe:{' '}
        {selectedScreening.series ? selectedScreening.series.title : ''}
      </ScreeningSeriesStyled>
      {loggedIn && (
        <EditLinkStyled to={'/intern/editScreening/' + selectedScreening._id}>
          Bearbeiten
        </EditLinkStyled>
      )}
    </ScreeningPageStyled>
  );
}

const ScreeningPageStyled = styled.article`
  position: relative;
  display: grid;
  grid-auto-rows: min-content;
  margin: 0 auto;
  max-width: 600px;
  padding: 60px 20px;
`;

const EditNoteStyled = styled.div`
  margin-bottom: 30px;
  color: green;
  font-size: 1.5em;
  font-weight: bold;
`;

const BackButtonStyled = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 20px;
  background-color: white;

  @media (min-width: 900px) {
    display: none;
  }
`;

const FilmStillStyled = styled.img`
  width: 100%;
`;

const ScreeningTitleStyled = styled.h2`
  margin: 0;
  padding: 10px;
  background-color: white;
`;

const FilmInfoStyled = styled.div`
  padding: 5px 10px 0 10px;
  background-color: black;
  color: white;
`;

const FilmDirectorStyled = styled.div`
  padding: 0 10px 5px 10px;
  background-color: black;
  color: white;
`;

const FilmSynopsisStyled = styled.p`
  overflow: auto;
  overflow-wrap: break-word;
  margin: 0;
  padding: 10px;
  background-color: white;
  white-space: pre-line;
`;

const ScreeningSeriesStyled = styled.div`
  padding: 10px;
  background-color: black;
  color: white;
`;

const EditLinkStyled = styled(Link)`
  padding: 10px;
  background-color: white;
  color: black;
  text-align: right;
`;
