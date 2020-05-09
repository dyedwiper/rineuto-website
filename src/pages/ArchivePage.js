import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import ScreeningsList from '../common/ScreeningsList';
import { getPastScreenings } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function ArchivePage() {
  const [screenings, setScreenings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Archiv | Rineuto Lichtspiele';
  }, []);

  useEffect(() => {
    getPastScreenings()
      .then((pastScreenings) => {
        const pastScreeningsFormatted = pastScreenings.map((pastScreening) => {
          const dateFormatted = new Date(pastScreening.date);
          return { ...pastScreening, date: dateFormatted };
        });
        setScreenings(pastScreeningsFormatted);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ArchivePageStyled>
      <SubHeadlineStyled>Vergangene Filmperlen</SubHeadlineStyled>
      <ScreeningsList screenings={screenings.sort((a, b) => b.date - a.date)} />
    </ArchivePageStyled>
  );
}

const ArchivePageStyled = styled.div`
  overflow: auto;
`;

const SubHeadlineStyled = styled.h2`
  margin: 20px 0;
  text-align: center;
  color: white;
`;
