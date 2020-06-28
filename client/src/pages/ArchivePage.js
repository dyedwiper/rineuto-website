import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import ScreeningsList from '../common/ScreeningsList';
import YearNavigation from '../common/YearNavigation';

export default function ArchivePage({ screenings }) {
  const startYear = 2018;
  const currentYear = new Date().getFullYear();
  const hithertoYears = [];
  for (let year = startYear; year <= currentYear; year++) {
    hithertoYears.push(year);
  }

  let history = useHistory();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [filteredScreenings, setFilteredScreenings] = useState([]);

  useEffect(() => {
    document.title = 'Archiv | Rineuto Lichtspiele';
  }, []);

  useEffect(() => {
    let yearFromPath = window.location.pathname.slice(9);
    if (!yearFromPath) {
      history.push('/archive/' + currentYear);
    }
    if (yearFromPath.endsWith('/')) {
      yearFromPath = yearFromPath.slice(0, -1);
    }
    setSelectedYear(yearFromPath);
  }, [currentYear, history, history.location.pathname]);

  useEffect(() => {
    setFilteredScreenings(
      screenings.filter(
        (screening) =>
          // eslint-disable-next-line eqeqeq
          screening.date.getFullYear() == selectedYear && screening.date < Date.now()
      )
    );
  }, [screenings, selectedYear]);

  return (
    <ArchivePageStyled>
      <YearNavigation
        years={hithertoYears}
        setSelectedYear={setSelectedYear}
        pagePath={history.location.pathname.split('/', 2).join('/') + '/'}
      />
      <SubHeadlineStyled>Vergangene Filmperlen</SubHeadlineStyled>
      <ScreeningsList screenings={filteredScreenings.sort((a, b) => b.date - a.date)} />
    </ArchivePageStyled>
  );
}

const ArchivePageStyled = styled.div`
  overflow: auto;
`;

const SubHeadlineStyled = styled.h2`
  margin: 20px 0;
  text-align: center;
  color: white;
`;
