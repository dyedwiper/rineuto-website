import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import ScreeningsList from '../common/ScreeningsList';
import { getFutureScreenings } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function HomePage() {
  const [screenings, setScreenings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Rineuto Lichtspiele';
  }, []);

  useEffect(() => {
    getFutureScreenings()
      .then((futureScreenings) => {
        const futureScreeningsFormatted = futureScreenings.map(
          (futureScreening) => {
            const dateFormatted = new Date(futureScreening.date);
            return { ...futureScreening, date: dateFormatted };
          }
        );
        setScreenings(futureScreeningsFormatted);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <HomePageStyled>
      <SubHeadlineStyled>Unsere nächsten Filmperlen</SubHeadlineStyled>
      <ScreeningsList screenings={screenings.sort((a, b) => a.date - b.date)} />
    </HomePageStyled>
  );
}

const HomePageStyled = styled.div`
  overflow: auto;
`;

const SubHeadlineStyled = styled.h2`
  margin: 20px 10px;
  text-align: center;
  color: white;
`;
