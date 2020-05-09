import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { getNews } from '../utils/services';
import LoadingPage from './LoadingPage';
import NewsCard from '../common/NewsCard';

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNews()
      .then((news) => {
        const newsFormatted = news.map((element) => {
          const dateFormatted = new Date(element.date);
          return { ...element, date: dateFormatted };
        });
        setNews(newsFormatted);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <WelcomePageStyled>
      <SubHeadlineStyled>Newsreel</SubHeadlineStyled>
      <NewsListStyled>
        {news.map((singleNews) => (
          <NewsCard key={singleNews._id} news={singleNews} />
        ))}
      </NewsListStyled>
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
