import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';
import DateRibbon from './DateRibbon';

export default function ScreeningCard({ screening, setSelectedScreening }) {
  let history = useHistory();

  return (
    <ScreeningCardStyled>
      <DateRibbon date={screening.date} />
      <FilmStillStyled
        onClick={handleClick}
        src={process.env.PUBLIC_URL + screening.imageUrl}
      />
      <ScreeningTitleStyled onClick={handleClick}>
        {screening.title}
      </ScreeningTitleStyled>
      <ScreeningSeriesStyled>
        Filmreihe: {screening.series}
      </ScreeningSeriesStyled>
    </ScreeningCardStyled>
  );

  function handleClick() {
    setSelectedScreening(screening);
    history.push('/screening?id=' + screening._id);
  }
}

const ScreeningCardStyled = styled.li`
  display: grid;
`;

const FilmStillStyled = styled.img`
  width: 100%;
  cursor: pointer;
`;

const ScreeningTitleStyled = styled.h2`
  margin: 0;
  background-color: white;
  padding: 10px;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const ScreeningSeriesStyled = styled.div`
  padding: 10px;
  background-color: black;
  color: white;
`;
