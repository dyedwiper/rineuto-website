import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import ScreeningsList from '../common/ScreeningsList';

export default function ArchivePage({ screenings, setSelectedScreening }) {
  useEffect(() => {
    document.title = 'Archiv | Rineuto Lichtspiele';
  }, []);

  return (
    <ArchivePageStyled>
      <SubHeadlineStyled>Vergangene Filmperlen</SubHeadlineStyled>
      <ScreeningsList
        screenings={screenings
          .filter((screening) => screening.date < Date.now())
          .sort((a, b) => b.date - a.date)}
        setSelectedScreening={setSelectedScreening}
      />
    </ArchivePageStyled>
  );
}

const ArchivePageStyled = styled.div`
  overflow: auto;
`;

const SubHeadlineStyled = styled.h2`
  margin: 20px 10px;
  text-align: center;
  color: white;
`;
