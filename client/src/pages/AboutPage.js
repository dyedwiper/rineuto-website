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
  const [quoteContainerHeight, setQuoteContainerHeight] = useState(250);

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

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <AboutPageStyled onClick={handleClick}>
      <AboutTextContainerStyled aboutTextHeight={aboutTextHeight}>
        <AboutTextStyled ref={aboutTextParagraph}>
          <div>Kino auf der Insel ohne Kino</div>
          <br />
          <div>
            Ufa
            <FootnoteLinkStyled href="#aboutFootnotes">
              <sup>1</sup>&nbsp;
            </FootnoteLinkStyled>
            im Fluss ohne Ufer
          </div>
          <br />
          <div>
            Bilder fließen in uns wie Getränke von der Bar, nähren uns wie vegane Speisen von der Küfa
            <FootnoteLinkStyled href="#aboutFootnotes">
              <sup>2</sup>&nbsp;
            </FootnoteLinkStyled>
            , bilden Inseln im Meer der Bilder.
          </div>
          <br />
          <div>Jeden paarten Dienstag in der Mokry in Hamburg-Wilhelmsburg.</div>
          <br />
        </AboutTextStyled>
      </AboutTextContainerStyled>
      <QuotePerlsContainerStyled
        quoteContainerHeight={quoteContainerHeight}
        numberOfOpenPerls={numberOfOpenPerls}
        ref={quoteContainer}
      >
        {quotes.map((quote) => (
          <QuotePerl
            key={quote._id}
            container={quoteContainer}
            setContainerHeight={setQuoteContainerHeight}
            quote={quote}
            numberOfOpenPerls={numberOfOpenPerls}
            setNumberOfOpenPerls={setNumberOfOpenPerls}
          />
        ))}
      </QuotePerlsContainerStyled>
      <FootnotesStyled id="aboutFootnotes">
        <sup>1</sup> Unkommerzielle film abende
        <br />
        <sup>2</sup> Kulinarische überreste fancy angerichtet - circa eine Stunde vor Filmbeginn
      </FootnotesStyled>
    </AboutPageStyled>
  );

  function handleClick(event) {
    if (!event.target.className.startsWith('Quote')) {
      setNumberOfOpenPerls(0);
      setQuoteContainerHeight(250);
    }
  }
}

const AboutPageStyled = styled.div`
  padding: 20px;
`;

const AboutTextContainerStyled = styled.div`
  margin: 0 auto;
  max-width: 600px;
  height: ${(props) =>
    (props.aboutTextHeight % 20 === 0
      ? props.aboutTextHeight
      : props.aboutTextHeight + 20 - (props.aboutTextHeight % 20)) + 'px'};
  padding: 10px 0;
`;

const AboutTextStyled = styled.div`
  color: white;
  font-size: 1.5em;
`;

const FootnoteLinkStyled = styled.a`
  color: white;
  text-decoration: none;
`;

const QuotePerlsContainerStyled = styled.div`
  position: relative;
  height: ${(props) => props.quoteContainerHeight + 'px'};
  min-height: 250px;
  margin-top: 20px;

  transition: ${(props) => (props.numberOfOpenPerls === 0 ? 'height 1s linear 1s' : 'height 1s linear')};
`;

const FootnotesStyled = styled.div`
  margin: 40px auto;
  max-width: 600px;
  color: white;
`;
