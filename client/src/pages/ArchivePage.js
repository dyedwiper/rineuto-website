import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import ScreeningsList from '../common/ScreeningsList';
import YearNavigation from '../common/YearNavigation';
import hal9000 from '../assets/hal9000.png';

export default function ArchivePage({ screenings }) {
  const allYears = screenings
    .map((screening) => screening.date.getFullYear())
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);
  const latestYear = allYears[allYears.length - 1];

  let history = useHistory();

  const [selectedYear, setSelectedYear] = useState(latestYear);
  const [filteredScreenings, setFilteredScreenings] = useState([]);

  useEffect(() => {
    document.title = 'Archiv | Rineuto Lichtspiele';
  }, []);

  useEffect(() => {
    let yearFromPath = window.location.pathname.slice(9);
    if (!yearFromPath) {
      history.push('/archive/' + latestYear);
    }
    if (yearFromPath.endsWith('/')) {
      yearFromPath = yearFromPath.slice(0, -1);
    }
    setSelectedYear(yearFromPath);
  }, [latestYear, history, history.location.pathname]);

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
        years={allYears}
        setSelectedYear={setSelectedYear}
        pagePath={history.location.pathname.split('/', 2).join('/') + '/'}
      />
      <SubHeadlineStyled>Vergangene Filmperlen</SubHeadlineStyled>
      <ScreeningsList screenings={filteredScreenings.sort((a, b) => b.date - a.date)} />
      <PerlLinkStyled href="https://www.youtube.com/watch?v=4VyUMIZr1PU" target="_blank" rel="noopener noreferrer">
        <HalImageStyled src={hal9000} alt="HAL 9000" />
      </PerlLinkStyled>
    </ArchivePageStyled>
  );
}

const ArchivePageStyled = styled.div``;

const SubHeadlineStyled = styled.h2`
  margin: 20px 0;
  text-align: center;
  color: white;
`;

const PerlLinkStyled = styled.a`
  position: absolute;
  top: 360px;
  left: 260px;
  z-index: 1;
  height: 20px;
  width: 20px;

  @media (min-width: 900px) {
    left: 700px;
  }
`;

const HalImageStyled = styled.img``;
