import React, { useContext } from 'react';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import UserContext from '../userContext';

export default function NoticeCard({ notice, editedObject }) {
  const { user } = useContext(UserContext);
  const loggedIn = Object.keys(user).length !== 0;

  return (
    <NoticeCardStyled>
      <NoticeImageStyled src={notice.imageUrl} />
      <NoticeTitleRowStyled>
        <NoticeTitleStyled>{notice.title}</NoticeTitleStyled>
        <NoticeDateStyled>
          {notice.date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </NoticeDateStyled>
      </NoticeTitleRowStyled>
      <NoticeTextStyled>
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a target="blank" href={decoratedHref} key={key}>
              {decoratedText}
            </a>
          )}
        >
          {notice.text}
        </Linkify>
      </NoticeTextStyled>
      {loggedIn && (
        <EditContainerStyled>
          {editedObject._id === notice._id && <EditNoteStyled>Änderungen gespeichert</EditNoteStyled>}
          <EditLinkStyled to={'/intern/editNotice/' + notice._id}>Bearbeiten</EditLinkStyled>
        </EditContainerStyled>
      )}
    </NoticeCardStyled>
  );
}

const NoticeCardStyled = styled.li`
  display: grid;
`;

const NoticeImageStyled = styled.img`
  width: 100%;
`;

const NoticeTitleRowStyled = styled.div`
  position: relative;
  overflow: auto;
`;

const NoticeTitleStyled = styled.h2`
  margin: 0;
  padding: 40px 20px 10px 20px;
  background-color: white;
`;

const NoticeDateStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 20px;
  color: white;
  background-color: black;
`;

const NoticeTextStyled = styled.p`
  overflow: auto;
  margin: 0;
  padding: 20px;
  background-color: white;
  white-space: pre-line;
`;

const EditContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px 20px;
  background-color: black;
`;

const EditNoteStyled = styled.span`
  color: green;
`;

const EditLinkStyled = styled(Link)`
  grid-column-start: 2;
  color: white;
  justify-self: right;
`;
