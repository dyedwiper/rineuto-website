import React, { useState } from 'react';
import styled from 'styled-components/macro';
import PostersList from '../common/PostersList';
import YearNavigation from '../common/YearNavigation';
import { useHistory } from 'react-router-dom';

export default function PosterPage() {
  const startYear = 2018;
  const currentYear = new Date().getFullYear();
  const hithertoYears = [];
  for (let year = startYear; year <= currentYear; year++) {
    hithertoYears.push(year);
  }

  const yearFromPath = window.location.pathname.slice(9);
  let history = useHistory();
  if (!yearFromPath) {
    history.push('/posters/' + currentYear);
  }

  const [selectedYear, setSelectedYear] = useState(yearFromPath || currentYear);

  return (
    <PosterPageStyled>
      <YearNavigation
        hithertoYears={hithertoYears}
        setSelectedYear={setSelectedYear}
      />
      <PostersList selectedYear={selectedYear} />
    </PosterPageStyled>
  );
}

const PosterPageStyled = styled.div``;
