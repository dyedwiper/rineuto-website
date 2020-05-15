import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import ScreeningsList from '../common/ScreeningsList';
import YearNavigation from '../common/YearNavigation';
import { getPastScreeningsByYear } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function ArchivePage() {
  const startYear = 2018;
  const currentYear = new Date().getFullYear();
  const hithertoYears = [];
  for (let year = startYear; year <= currentYear; year++) {
    hithertoYears.push(year);
  }

  let history = useHistory();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [screenings, setScreenings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    getPastScreeningsByYear(selectedYear)
      .then((pastScreenings) => {
        const pastScreeningsFormatted = pastScreenings.map((pastScreening) => {
          const dateFormatted = new Date(pastScreening.date);
          return { ...pastScreening, date: dateFormatted };
        });
        setScreenings(pastScreeningsFormatted);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [selectedYear]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ArchivePageStyled>
      <YearNavigation
        hithertoYears={hithertoYears}
        setSelectedYear={setSelectedYear}
        pagePath={history.location.pathname.split('/', 2).join('/') + '/'}
      />
      <SubHeadlineStyled>Vergangene Filmperlen</SubHeadlineStyled>
      <ScreeningsList screenings={screenings.sort((a, b) => b.date - a.date)} />
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
