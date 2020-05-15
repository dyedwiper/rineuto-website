import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import NewsCard from '../common/NewsCard';
import { getNews } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNews()
      .then((news) => {
        const newsFormatted = news.map((newsItem) => {
          const textFormatted = newsItem.text.replace(/\\n/g, '\n');
          const dateFormatted = new Date(newsItem.date);
          return { ...newsItem, text: textFormatted, date: dateFormatted };
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
        {news
          .sort((a, b) => b.date - a.date)
          .map((singleNews) => (
            <NewsCard key={singleNews._id} news={singleNews} />
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
