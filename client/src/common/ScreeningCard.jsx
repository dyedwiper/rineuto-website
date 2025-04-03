import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DateRibbon from './DateRibbon';

export default function ScreeningCard({ screening }) {
  return (
    <ScreeningCardStyled>
      <DateRibbon date={screening.date} />
      <LinkStyled to={'/screening/' + screening._id}>
        <FilmStillStyled src={screening.imageUrl} alt={screening.altText} />
        <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
      </LinkStyled>
      {screening.special && <SpecialStyled>{screening.special}</SpecialStyled>}
      {screening.serial && <ScreeningSerialStyled>Filmreihe: {screening.serial.title}</ScreeningSerialStyled>}
    </ScreeningCardStyled>
  );
}

const ScreeningCardStyled = styled.li`
  position: relative;
  z-index: 2;
  display: grid;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const LinkStyled = styled(Link)`
  display: grid;
  color: var(--secondary-color);
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const FilmStillStyled = styled.img`
  width: 100%;
`;

const ScreeningTitleStyled = styled.h3`
  max-width: 560px;
  margin: 0;
  padding: 10px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  font-size: 1.5rem;
`;

const SpecialStyled = styled.div`
  max-width: 560px;
  padding: 10px;
  background-color: var(--special-color);
  color: var(--secondary-color);
  font-weight: bold;
`;

const ScreeningSerialStyled = styled.div`
  padding: 10px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
`;
