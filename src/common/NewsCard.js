import React from 'react';
import styled from 'styled-components/macro';

export default function NewsCard({ news }) {
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
      <NewsTextStyled>{news.text}</NewsTextStyled>
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
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

const NewsTitleStyled = styled.h3`
  margin: 0;
  padding: 10px;
  color: white;
  background-color: black;
`;

const NewsDateStyled = styled.div`
  display: grid;
  place-items: center;
  padding: 10px;
  background-color: white;
`;

const NewsTextStyled = styled.p`
  margin: 0;
  padding: 10px;
  background-color: white;
`;
