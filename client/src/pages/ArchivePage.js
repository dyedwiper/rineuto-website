import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import hal9000 from '../assets/hal9000.png';
import ScreeningsList from '../common/ScreeningsList';
import YearNavigation from '../common/YearNavigation';
import LoadingPage from './LoadingPage';
import { getPastScreeningsByYear, getYearsOfPastScreenings } from '../services/screeningServices';

export default function ArchivePage() {
  const [screenings, setScreenings] = useState([]);
  const [allYears, setAllYears] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Archiv | Rineuto Lichtspiele';
  }, []);

  useEffect(() => {
    getYearsOfPastScreenings().then((res) => {
      setAllYears(res.data);
    });
  }, []);

  useEffect(() => {
    getPastScreeningsByYear(selectedYear).then((res) => {
      setScreenings(res.data);
      setIsLoading(false);
    });
  }, [selectedYear]);

  if (isLoading) return <LoadingPage />;

  return (
    <ArchivePageStyled>
      <YearNavigation years={allYears} setSelectedYear={setSelectedYear} pagePath={'/archive/'} />
      <SubHeadlineStyled>Vergangene Filmperlen</SubHeadlineStyled>
      <ScreeningsList screenings={screenings} />
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
