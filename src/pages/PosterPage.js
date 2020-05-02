import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import YearNavigation from '../common/YearNavigation';
import whitePerlImage from '../assets/perls/whitePerl.png';
import { getSeries } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function PosterPage() {
  const startYear = 2018;
  const currentYear = new Date().getFullYear();
  const hithertoYears = [];
  for (let year = startYear; year <= currentYear; year++) {
    hithertoYears.push(year);
  }

  const [selectedYear, setSelectedYear] = useState(startYear);
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSelectedYear(window.location.pathname.slice(8));
    getSeries(selectedYear)
      .then((series) => {
        setSelectedSeries(series);
        console.log('series', series);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [selectedYear]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <PosterPageStyled>
      <YearNavigation years={hithertoYears} />
      <PosterListStyled>
        {selectedSeries.map((series) => (
          <PosterItemStyled key={series._id}>
            <PosterStyled src={process.env.PUBLIC_URL + series.posterUrl} />
          </PosterItemStyled>
        ))}
      </PosterListStyled>
    </PosterPageStyled>
  );
}

const PosterPageStyled = styled.div``;

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
