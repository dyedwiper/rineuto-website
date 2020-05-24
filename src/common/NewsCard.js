import React, { useContext } from 'react';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import UserContext from '../userContext';

export default function NewsCard({ news, editedObject }) {
  const { user } = useContext(UserContext);
  const loggedIn = Object.keys(user).length !== 0;

  return (
    <NewsCardStyled>
      <NewsImageStyled src={process.env.PUBLIC_URL + news.imageUrl} />
      <NewsTitleRowStyled>
        <NewsTitleStyled>{news.title}</NewsTitleStyled>
        <NewsDateStyled>
          {news.date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </NewsDateStyled>
      </NewsTitleRowStyled>
      <NewsTextStyled>
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a target="blank" href={decoratedHref} key={key}>
              {decoratedText}
            </a>
          )}
        >
          {news.text}
        </Linkify>
      </NewsTextStyled>
      <EditContainerStyled>
        {editedObject._id === news._id && <EditNoteStyled>Änderungen gespeichert</EditNoteStyled>}
        {loggedIn && <EditLinkStyled to={'/intern/editNews/' + news._id}>Bearbeiten</EditLinkStyled>}
      </EditContainerStyled>
    </NewsCardStyled>
  );
}

const NewsCardStyled = styled.li`
  display: grid;
`;

const NewsImageStyled = styled.img`
  width: 100%;
`;

const NewsTitleRowStyled = styled.div`
  position: relative;
`;

const NewsTitleStyled = styled.h2`
  margin: 0;
  padding: 20px;
  padding-bottom: 10px;
  background-color: white;
`;

const NewsDateStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 20px;
  color: white;
  background-color: black;
`;

const NewsTextStyled = styled.p`
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
