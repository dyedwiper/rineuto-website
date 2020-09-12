import React from 'react';
import styled from 'styled-components/macro';
import ScreeningCard from './ScreeningCard.js';

export default function ScreeningsList({ screenings, setSelectedScreening }) {
  return (
    <ScreeningsListStyled>
      {screenings.map((screening) => (
        <ScreeningCard key={screening._id} screening={screening} setSelectedScreening={setSelectedScreening} />
      ))}
      <Cushion />
    </ScreeningsListStyled>
  );
}

const ScreeningsListStyled = styled.ul`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 50px;
  margin: 0 auto;
  max-width: 600px;
  padding: 30px 20px;
  list-style-type: none;
`;

const Cushion = styled.div`
  height: 30px;
`;
