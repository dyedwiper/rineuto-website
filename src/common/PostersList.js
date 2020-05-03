import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import whitePerlImage from '../assets/perls/whitePerl.png';
import { getSeries } from '../utils/services';
import LoadingPage from '../pages/LoadingPage';

export default function PostersList({ selectedYear }) {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!selectedYear || isNaN(selectedYear)) return;
    getSeries(selectedYear)
      .then((series) => {
        setSeries(series);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [selectedYear]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <PosterListStyled>
      {series
        .sort((a, b) => a.month - b.month)
        .map((series) => (
          <PosterItemStyled key={series._id}>
            <PosterStyled src={process.env.PUBLIC_URL + series.posterUrl} />
          </PosterItemStyled>
        ))}
    </PosterListStyled>
  );
}

const PosterListStyled = styled.ul`
  display: grid;
  grid-template-rows: min-content;
  grid-template-columns: 320px;
  grid-gap: 40px;
  justify-content: center;
  margin: 0;
  padding: 40px;
  list-style: none;

  @media (min-width: 760px) {
    grid-template-columns: 320px 320px;
  }
`;

const PosterItemStyled = styled.li`
  width: 320px;
  padding: 20px;
  background-image: url(${whitePerlImage});
`;

const PosterStyled = styled.img`
  width: 280px;
`;
