import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ScreeningsList from '../common/ScreeningsList';
import { getFutureScreenings } from '../services/screeningServices';
import LoadingPage from './LoadingPage';
import Context from '../Context';

export default function ProgramPage() {
  const [screenings, setScreenings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Programm | Rineuto Lichtspiele';
  }, []);

  useEffect(() => {
    getFutureScreenings().then((res) => {
      setScreenings(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ProgramPageStyled>
      <SubHeadlineStyled>Unsere nächsten Filmperlen</SubHeadlineStyled>
      <ScreeningsList screenings={screenings} />
    </ProgramPageStyled>
  );
}

const ProgramPageStyled = styled.div``;

const SubHeadlineStyled = styled.h2`
  margin: 20px 0;
  text-align: center;
  color: var(--primary-color);
`;
