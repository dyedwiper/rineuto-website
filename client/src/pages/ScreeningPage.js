import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';
import Context from '../Context';
import DateRibbon from '../common/DateRibbon';
import LoadingPage from './LoadingPage';

export default function ScreeningPage({ screenings, editedObject }) {
  const [selectedScreening, setSelectedScreening] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidId, setIsInvalidId] = useState(false);

  const { isUserLoggedIn } = useContext(Context);

  useEffect(() => {
    if (selectedScreening) {
      document.title = selectedScreening.title + ' | Rineuto Lichtspiele';
    }
  }, [selectedScreening]);

  useEffect(() => {
    const screeningId = window.location.pathname.slice(-24);
    const screening = screenings.find((screening) => screening._id === screeningId);
    if (!screening) {
      setIsInvalidId(true);
    }
    setSelectedScreening(screening);
    setIsLoading(false);
  }, [screenings]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isInvalidId) {
    return <Redirect to="/404" />;
  }

  return (
    <ScreeningPageStyled>
      {editedObject._id === selectedScreening._id && <EditNoteStyled>Änderungen gespeichert</EditNoteStyled>}
      <ScreeningInfoContainerStyled>
        <DateRibbon date={selectedScreening.date} />
        <FilmStillStyled src={selectedScreening.imageUrl} alt={selectedScreening.altText} />
        {selectedScreening.special && <SpecialStyled>{selectedScreening.special}</SpecialStyled>}
        <ScreeningTitleStyled>{selectedScreening.title}</ScreeningTitleStyled>
        <FilmInfoStyled>
          {selectedScreening.country +
            ' ' +
            selectedScreening.year +
            ' | ' +
            selectedScreening.length +
            ' Min' +
            (selectedScreening.version && ' | ' + selectedScreening.version)}
        </FilmInfoStyled>
        <FilmDirectorStyled>{'Regie: ' + selectedScreening.director}</FilmDirectorStyled>
        <FilmSynopsisStyled dangerouslySetInnerHTML={{ __html: selectedScreening.synopsis }} />
        {selectedScreening.serial && (
          <ScreeningSerialStyled>Filmreihe: {selectedScreening.serial.title}</ScreeningSerialStyled>
        )}
        {isUserLoggedIn && (
          <EditLinkStyled to={'/intern/editScreening/' + selectedScreening._id}>Bearbeiten</EditLinkStyled>
        )}
      </ScreeningInfoContainerStyled>
    </ScreeningPageStyled>
  );
}

const ScreeningPageStyled = styled.article`
  position: relative;
  margin: 0 auto;
  max-width: 600px;
  padding: 60px 20px;
`;

const EditNoteStyled = styled.div`
  margin-bottom: 60px;
  color: var(--success-color);
  font-size: 1.5em;
  font-weight: bold;
`;

const ScreeningInfoContainerStyled = styled.div`
  position: relative;
  display: grid;
  grid-auto-rows: min-content;
  margin-top: 20px;
`;

const FilmStillStyled = styled.img`
  width: 100%;
`;

const ScreeningTitleStyled = styled.h2`
  max-width: 560px;
  margin: 0;
  padding: 10px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
`;

const SpecialStyled = styled.div`
  max-width: 560px;
  padding: 10px;
  background-color: var(--special-color);
  color: var(--secondary-color);
  font-weight: bold;
`;

const FilmInfoStyled = styled.div`
  padding: 5px 10px 0 10px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
`;

const FilmDirectorStyled = styled.div`
  padding: 0 10px 5px 10px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
`;

const FilmSynopsisStyled = styled.div`
  overflow: auto;
  padding: 10px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  white-space: pre-line;

  & p {
    margin: 0;
  }
`;

const ScreeningSerialStyled = styled.div`
  padding: 10px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
`;

const EditLinkStyled = styled(Link)`
  padding: 10px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  text-align: right;
`;
