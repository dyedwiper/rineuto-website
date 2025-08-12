import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import eightBall from '../assets/eightBall.png';
import PostersList from '../common/PostersList';
import YearNavigation from '../common/YearNavigation';
import { getSerialsByYear, getSerialYears } from '../services/serialServices';
import LoadingPage from './LoadingPage';
import Context from '../Context';

export default function PosterPage() {
  const [serials, setSerials] = useState([]);
  const [allYears, setAllYears] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { setIsError } = useContext(Context);

  useEffect(() => {
    document.title = 'Plakate | Rineuto Lichtspiele';
  }, []);

  useEffect(() => {
    getSerialYears()
      .then((res) => {
        const years = res.data;
        setAllYears(years);
        setSelectedYear(years[years.length - 1]);
      })
      .catch(() => setIsError(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedYear) {
      getSerialsByYear(selectedYear)
        .then((res) => {
          setSerials(res.data);
          setIsLoading(false);
        })
        .catch(() => setIsError(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  if (isLoading) return <LoadingPage />;

  return (
    <PosterPageStyled>
      <YearNavigation years={allYears} setSelectedYear={setSelectedYear} pagePath={'/posters/'} />
      <PostersList serials={serials} />
      <PerlLinkStyled href="https://www.youtube.com/watch?v=fsAE2jFPqLw" target="_blank" rel="noopener noreferrer">
        <EightBallImageStyled src={eightBall} alt="Ein 8 ball" />
      </PerlLinkStyled>
    </PosterPageStyled>
  );
}

const PosterPageStyled = styled.div``;

const PerlLinkStyled = styled.a`
  position: absolute;
  top: 300px;
  left: 160px;
  z-index: 1;

  @media (min-width: 900px) {
    left: 400px;
  }
`;

const EightBallImageStyled = styled.img`
  height: 20px;
  width: 20px;
`;
