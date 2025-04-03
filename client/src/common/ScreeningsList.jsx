import React from 'react';
import styled from 'styled-components';
import ScreeningCard from './ScreeningCard';

export default function ScreeningsList({ screenings }) {
  return (
    <ScreeningsListStyled>
      {screenings.map((screening) => (
        <ScreeningCard key={screening._id} screening={screening} />
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
