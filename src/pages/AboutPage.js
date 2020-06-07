import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import QuotePerl from '../common/QuotePerl';
import { getQuotes } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function AboutPage() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getQuotes()
      .then((quotes) => {
        setQuotes(quotes);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    document.title = 'Über uns | Rineuto Lichtspiele';
  }, []);

  const aboutText =
    'Wir veranstalten etwa alle zwei Wochen einen Filmabend in der Mokrystr. 1. \n In unseren Filmreihen widmen wir uns über je zwei Monate einem Thema oder einer Person. \n Nach den Filmen diskutieren wir häufig noch ein Weilchen über die Eindrücke und manchmal gibt es ein kurzes filmhistorisches Referat. \n Der Eintritt ist frei. Kühle Getränke gibt es an der Bar. Für beides nehmen wir gerne Spenden entgegen.';

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <AboutPageStyled>
      <SubHeadlineStyled>Über uns</SubHeadlineStyled>
      <AboutTextStyled>
        {aboutText.split('\n').map((part, index) => (
          <span key={index}>
            {part}
            <br />
            <br />
          </span>
        ))}
      </AboutTextStyled>
      <QuotePerlsContainerStyled>
        <QuotePerl quote={quotes[0]} top="100px" left="200px"></QuotePerl>
        <QuotePerl quote={quotes[1]} top="200px" left="400px"></QuotePerl>
        <QuotePerl quote={quotes[2]} top="240px" left="300px"></QuotePerl>
      </QuotePerlsContainerStyled>
    </AboutPageStyled>
  );
}

const AboutPageStyled = styled.div`
  padding: 20px;
`;

const SubHeadlineStyled = styled.h2`
  height: 40px;
  margin: 10px 0;
  color: white;
  text-align: center;
`;

const AboutTextStyled = styled.p`
  margin: 0 auto;
  height: 200px;
  max-width: 600px;
  padding: 10px;
  background-color: white;
`;

const QuotePerlsContainerStyled = styled.div`
  position: relative;
  height: 500px;
`;
