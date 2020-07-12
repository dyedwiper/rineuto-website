import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import QuotePerl from '../common/QuotePerl';
import { getQuotes } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function AboutPage() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfOpenPerls, setNumberOfOpenPerls] = useState(0);
  const [aboutTextHeight, setAboutTextHeight] = useState(0);

  const quoteContainer = useRef(null);
  const aboutTextParagraph = useRef(null);

  useEffect(() => {
    getQuotes()
      .then((quotes) => {
        setQuotes(quotes);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setAboutTextHeight(aboutTextParagraph.current.offsetHeight);
    }
  }, [isLoading]);

  useEffect(() => {
    document.title = 'Über uns | Rineuto Lichtspiele';
  }, []);

  const aboutText =
    'Jeden paarten Dienstag zeigen wir einen Film in der Mokry in Hamburg-Wilhelmsburg zu freiem Eintritt bei gern entgegengenommenen Spenden. \n Etwa eine Stunde vor Filmbeginn gibt es gewöhnlich eine vegane Speisung, auch KüFA genannt. \n Noch sorgfältiger als die Zutaten wählen wir die Filme aus. Ein Rezept gibt es nicht, aber Gedankenperlen, die uns leiten.';

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <AboutPageStyled>
      <SubHeadlineStyled>Über uns</SubHeadlineStyled>
      <AboutTextContainerStyled aboutTextHeight={aboutTextHeight}>
        <AboutTextStyled ref={aboutTextParagraph}>
          {aboutText.split('\n').map((part, index) => (
            <span key={index}>
              {part}
              <br />
              <br />
            </span>
          ))}
        </AboutTextStyled>
      </AboutTextContainerStyled>
      <QuotePerlsContainerStyled ref={quoteContainer} onClick={handleClick}>
        {quotes.map((quote) => (
          <QuotePerl
            key={quote._id}
            container={quoteContainer}
            quote={quote}
            numberOfOpenPerls={numberOfOpenPerls}
            setNumberOfOpenPerls={setNumberOfOpenPerls}
          />
        ))}
      </QuotePerlsContainerStyled>
    </AboutPageStyled>
  );

  function handleClick(event) {
    if (!event.target.className.startsWith('Quote')) {
      setNumberOfOpenPerls(0);
    }
  }
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

const AboutTextContainerStyled = styled.div`
  margin: 0 auto;
  max-width: 600px;
  height: ${(props) =>
    (props.aboutTextHeight % 20 === 0
      ? props.aboutTextHeight
      : props.aboutTextHeight + 20 - (props.aboutTextHeight % 20)) + 'px'};
  padding: 10px;
`;

const AboutTextStyled = styled.p`
  color: white;
`;

const QuotePerlsContainerStyled = styled.div`
  position: relative;
  height: 250px;
`;
