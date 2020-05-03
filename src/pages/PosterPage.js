import React, { useState, useEffect } from 'react';
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

  let history = useHistory();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    document.title = 'Plakate | Rineuto Lichtspiele';
  }, []);

  useEffect(() => {
    let yearFromPath = window.location.pathname.slice(9);
    if (!yearFromPath) {
      history.push('/posters/' + currentYear);
    }
    if (yearFromPath.endsWith('/')) {
      yearFromPath = yearFromPath.slice(0, -1);
    }
    setSelectedYear(yearFromPath);

    const unlisten = history.listen(() => {
      if (window.location.pathname === ('/posters' || '/posters/')) {
        history.push('/posters/' + currentYear);
        setSelectedYear(currentYear);
      }
    });

    return unlisten;
  }, [currentYear, history]);

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
