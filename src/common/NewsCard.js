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
  position: relative;
`;

const NewsTitleStyled = styled.h2`
  margin: 0;
  padding: 10px;
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
  padding: 10px;
  background-color: white;
  white-space: pre-line;
`;
