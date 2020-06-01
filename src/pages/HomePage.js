import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import NoticeCard from '../common/NoticeCard';

export default function HomePage({ notices, editedObject }) {
  useEffect(() => {
    document.title = 'Rineuto Lichtspiele';
  }, []);

  return (
    <HomePageStyled>
      <SubHeadlineStyled>Newsreel</SubHeadlineStyled>
      {editedObject.added === 'notice' && <EditNoteStyled>News hinzugefügt</EditNoteStyled>}
      {editedObject.deleted === 'notice' && <EditNoteStyled>News gelöscht</EditNoteStyled>}
      <NoticesListStyled>
        {notices
          .sort((a, b) => b.date - a.date)
          .map((notice) => (
            <NoticeCard key={notice._id} notice={notice} editedObject={editedObject} />
          ))}
      </NoticesListStyled>
      <Cushion />
    </HomePageStyled>
  );
}

const HomePageStyled = styled.div`
  overflow: auto;
`;

const SubHeadlineStyled = styled.h2`
  margin: 20px 0 0 0;
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

const NoticesListStyled = styled.ul`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 50px;
  overflow: auto;
  margin: 0 auto;
  max-width: 600px;
  padding: 30px 20px;
  list-style-type: none;
`;

const Cushion = styled.div`
  height: 30px;
`;
