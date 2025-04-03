import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ScreeningsList from '../common/ScreeningsList';
import { getFutureScreenings } from '../services/screeningServices';
import LoadingPage from './LoadingPage';
import Context from '../Context';

export default function ProgramPage({ editedObject }) {
  const [screenings, setScreenings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setIsError } = useContext(Context);

  useEffect(() => {
    document.title = 'Programm | Rineuto Lichtspiele';
  }, []);

  useEffect(() => {
    getFutureScreenings()
      .then((res) => {
        setScreenings(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ProgramPageStyled>
      <SubHeadlineStyled>Unsere nächsten Filmperlen</SubHeadlineStyled>
      {editedObject.added === 'screening' && <EditNoteStyled>Vorführung hinzugefügt</EditNoteStyled>}
      {editedObject.deleted === 'screening' && <EditNoteStyled>Vorführung gelöscht</EditNoteStyled>}
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

const EditNoteStyled = styled.div`
  margin: 20px;
  color: var(--success-color);
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;
