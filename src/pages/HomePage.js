import React from 'react';
import styled from 'styled-components/macro';
import NewsCard from '../common/NewsCard';

export default function HomePage({ news, editedObject }) {
  return (
    <WelcomePageStyled>
      <SubHeadlineStyled>Newsreel</SubHeadlineStyled>
      {editedObject.deleted === 'news' && <EditNoteStyled>News gelöscht</EditNoteStyled>}
      <NewsListStyled>
        {news
          .sort((a, b) => b.date - a.date)
          .map((singleNews) => (
            <NewsCard key={singleNews._id} news={singleNews} editedObject={editedObject} />
          ))}
      </NewsListStyled>
      <Cushion />
    </WelcomePageStyled>
  );
}

const WelcomePageStyled = styled.div`
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

const NewsListStyled = styled.ul`
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
