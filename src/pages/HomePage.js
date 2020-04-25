import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import ScreeningsList from '../common/ScreeningsList';

export default function HomePage({ screenings, setSelectedScreening }) {
  useEffect(() => {
    document.title = 'Rineuto Lichtspiele';
  }, []);

  return (
    <HomePageStyled>
      <SubHeadlineStyled>Unsere nächsten Filmperlen</SubHeadlineStyled>
      <ScreeningsList
        screenings={screenings
          .filter((screening) => screening.date >= Date.now())
          .sort((a, b) => a.date - b.date)}
        setSelectedScreening={setSelectedScreening}
      />
    </HomePageStyled>
  );
}

const HomePageStyled = styled.div`
  overflow: auto;
`;

const SubHeadlineStyled = styled.h2`
  margin: 20px 10px;
  text-align: center;
  color: white;
`;
