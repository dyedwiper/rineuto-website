import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import ScreeningsList from '../common/ScreeningsList';

export default function ProgramPage({ screenings }) {
  useEffect(() => {
    document.title = 'Programm | Rineuto Lichtspiele';
  }, []);

  return (
    <ProgramPageStyled>
      <SubHeadlineStyled>Unsere nächsten Filmperlen</SubHeadlineStyled>
      <ScreeningsList
        screenings={screenings
          .filter((screening) => screening.date >= Date.now())
          .sort((a, b) => a.date - b.date)}
      />
    </ProgramPageStyled>
  );
}

const ProgramPageStyled = styled.div`
  overflow: auto;
`;

const SubHeadlineStyled = styled.h2`
  margin: 20px 0;
  text-align: center;
  color: white;
`;
