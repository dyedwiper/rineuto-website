import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../Context';
import DateRibbon from '../common/DateRibbon';
import { getScreening } from '../services/screeningServices';
import LoadingPage from './LoadingPage';

export default function ScreeningPage() {
  const [screening, setScreening] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { isUserLoggedIn } = useContext(Context);

  useEffect(() => {
    if (screening) {
      document.title = screening.title + ' | Rineuto Lichtspiele';
    }
  }, [screening]);

  useEffect(() => {
    const screeningId = window.location.pathname.slice(-24);
    getScreening(screeningId).then((res) => {
      setScreening(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ScreeningPageStyled>
      <ScreeningInfoContainerStyled>
        <DateRibbon date={screening.date} />
        <FilmStillStyled src={screening.imageUrl} alt={screening.altText} />
        {screening.special && <SpecialStyled>{screening.special}</SpecialStyled>}
        <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
        <FilmInfoStyled>
          {screening.country +
            ' ' +
            screening.year +
            ' | ' +
            screening.length +
            ' Min' +
            (screening.version && ' | ' + screening.version)}
        </FilmInfoStyled>
        <FilmDirectorStyled>{'Regie: ' + screening.director}</FilmDirectorStyled>
        <FilmSynopsisStyled dangerouslySetInnerHTML={{ __html: screening.synopsis }} />
        {screening.serial && <ScreeningSerialStyled>Filmreihe: {screening.serial.title}</ScreeningSerialStyled>}
        {isUserLoggedIn && <EditLinkStyled to={'/intern/editScreening/' + screening._id}>Bearbeiten</EditLinkStyled>}
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
