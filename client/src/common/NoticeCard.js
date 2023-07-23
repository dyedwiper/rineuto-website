import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import Context from '../Context';
import { formatToDateString } from '../utils/dateFormatters';

export default function NoticeCard({ notice, editedObject }) {
  const { isUserLoggedIn } = useContext(Context);

  return (
    <NoticeCardStyled>
      <NoticeImageStyled src={notice.imageUrl} alt={notice.altText} />
      <NoticeTitleRowStyled>
        <NoticeTitleStyled>{notice.title}</NoticeTitleStyled>
        <NoticeDateStyled>{formatToDateString(notice.date)}</NoticeDateStyled>
      </NoticeTitleRowStyled>
      <NoticeTextStyled dangerouslySetInnerHTML={{ __html: notice.text }} />
      {isUserLoggedIn && (
        <EditContainerStyled>
          {editedObject._id === notice._id && <EditNoteStyled>Änderungen gespeichert</EditNoteStyled>}
          <EditLinkStyled to={'/intern/editNotice/' + notice._id}>Bearbeiten</EditLinkStyled>
        </EditContainerStyled>
      )}
    </NoticeCardStyled>
  );
}

const NoticeCardStyled = styled.li`
  position: relative;
  z-index: 2;
  display: grid;
`;

const NoticeImageStyled = styled.img`
  width: 100%;
`;

const NoticeTitleRowStyled = styled.div`
  position: relative;
  overflow: auto;
`;

const NoticeTitleStyled = styled.h3`
  margin: 0;
  padding: 40px 20px 0 20px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  font-size: 1.5rem;
`;

const NoticeDateStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 20px;
  color: var(--primary-color);
  background-color: var(--secondary-color);
`;

const NoticeTextStyled = styled.div`
  overflow: auto;
  padding: 20px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  white-space: pre-line;

  & p {
    margin: 0;
  }
`;

const EditContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px 20px;
  background-color: var(--secondary-color);
`;

const EditNoteStyled = styled.span`
  color: var(--success-color);
`;

const EditLinkStyled = styled(Link)`
  grid-column-start: 2;
  color: var(--primary-color);
  justify-self: right;
`;
