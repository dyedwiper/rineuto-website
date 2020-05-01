import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import DateRibbon from '../common/DateRibbon';
import { getSingleScreening } from '../utils/services';
import LoadingPage from './LoadingPage';
import { Redirect } from 'react-router-dom';

export default function ScreeningPage() {
  const [selectedScreening, setSelectedScreening] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidId, setIsInvalidId] = useState(false);

  useEffect(() => {
    const screeningId = window.location.pathname.slice(11);
    getSingleScreening(screeningId)
      .then((screening) => {
        // console.log('public url: ', process.env.PUBLIC_URL);
        const dateFormatted = new Date(screening.date);
        setSelectedScreening({ ...screening, date: dateFormatted });
        setIsLoading(false);
      })
      .catch(() => setIsInvalidId(true));
  }, []);

  useEffect(() => {
    document.title = selectedScreening.title + ' | Rineuto Lichtspiele';
  }, [selectedScreening]);

  if (isInvalidId) {
    return <Redirect to="/404" />;
  }
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <ScreeningPageStyled>
      <DateRibbon date={selectedScreening.date} />
      <FilmStillStyled src={'/' + selectedScreening.imageUrl} />
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
        Filmreihe: {selectedScreening.series}
      </ScreeningSeriesStyled>
    </ScreeningPageStyled>
  );
}

const ScreeningPageStyled = styled.article`
  display: grid;
  grid-auto-rows: min-content;
  margin: 0 auto;
  max-width: 600px;
  padding: 40px 20px;
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
`;

const ScreeningSeriesStyled = styled.div`
  padding: 10px;
  background-color: black;
  color: white;
`;
