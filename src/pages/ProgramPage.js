import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import ScreeningsList from '../common/ScreeningsList';

export default function ProgramPage({ screenings, editedObject }) {
  useEffect(() => {
    document.title = 'Programm | Rineuto Lichtspiele';
  }, []);

  return (
    <ProgramPageStyled>
      <SubHeadlineStyled>Unsere nächsten Filmperlen</SubHeadlineStyled>
      {editedObject.deleted === 'screening' && <EditNoteStyled>Vorführung gelöscht</EditNoteStyled>}
      <ScreeningsList
        screenings={screenings.filter((screening) => screening.date >= Date.now()).sort((a, b) => a.date - b.date)}
      />
    </ProgramPageStyled>
  );
}

const ProgramPageStyled = styled.div`
  overflow: auto;
`;

const SubHeadlineStyled = styled.h2`
  margin: 20px 0;
  text-align: center;
  color: white;
`;

const EditNoteStyled = styled.div`
  margin: 20px;
  color: green;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;
