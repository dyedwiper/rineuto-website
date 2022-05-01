import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import hal9000 from '../assets/hal9000.png';
import ScreeningsList from '../common/ScreeningsList';
import YearNavigation from '../common/YearNavigation';
import LoadingPage from './LoadingPage';

export default function ArchivePage({ screenings }) {
  const [allYears, setAllYears] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [filteredScreenings, setFilteredScreenings] = useState([]);

  useEffect(() => {
    document.title = 'Archiv | Rineuto Lichtspiele';
  }, []);

  useEffect(() => {
    const years = screenings
      .map((screening) => screening.date.getFullYear())
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a - b);
    setAllYears(years);
  }, [screenings]);

  useEffect(() => {
    setFilteredScreenings(
      screenings.filter(
        (screening) =>
          // eslint-disable-next-line eqeqeq
          screening.date.getFullYear() == selectedYear && screening.date < Date.now()
      )
    );
  }, [screenings, selectedYear]);

  if (!allYears) return <LoadingPage />;

  return (
    <ArchivePageStyled>
      <YearNavigation years={allYears} setSelectedYear={setSelectedYear} pagePath={'/archive/'} />
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
  color: var(--primary-color);
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
