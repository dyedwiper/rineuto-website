import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import QuotePerl from '../common/QuotePerl';
import { getQuotes } from '../utils/services';
import LoadingPage from './LoadingPage';
import piez from '../assets/piez.png';

export default function AboutPage() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aboutTextHeight, setAboutTextHeight] = useState(0);
  const [openPerls, setOpenPerls] = useState([]);

  const quoteContainer = useRef(null);
  const aboutTextParagraph = useRef(null);
  const numberOfOpenPerlsBefore = useRef(null);

  useEffect(() => {
    getQuotes()
      .then((quotes) => {
        setQuotes(quotes);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    numberOfOpenPerlsBefore.current = openPerls.length;
  }, [openPerls]);

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
          <div>Kino auf der Insel ohne Kino.</div>
          <br />
          <div>
            Ufa
            <FootnoteLinkStyled href="#aboutFootnotes">
              <sup>1</sup>&nbsp;
            </FootnoteLinkStyled>
            im Fluss ohne Ufer.
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
          <div>
            Jeden paarten Dienstag in der{' '}
            <MokryLinkStyled href="http://mokrymokry.blogsport.eu/" target="_blank" rel="noopener noreferrer">
              Mokry
            </MokryLinkStyled>{' '}
            in Hamburg-Wilhelmsburg.
          </div>
          <br />
          <br />
          <div>Zitate sprechen lauter als weitere Worte. Klicke auf die Perlen, um mehr herauszufinden.</div>
        </AboutTextStyled>
      </AboutTextContainerStyled>
      <QuotePerlsContainerStyled
        openPerls={openPerls.map((perl) => perl.height)}
        numberOfOpenPerlsBefore={numberOfOpenPerlsBefore.current}
        ref={quoteContainer}
      >
        {quotes.map((quote) => (
          <QuotePerl
            key={quote._id}
            container={quoteContainer}
            quote={quote}
            openPerls={openPerls}
            setOpenPerls={setOpenPerls}
          />
        ))}
      </QuotePerlsContainerStyled>
      <FootnotesStyled id="aboutFootnotes">
        <sup>1</sup> Unkommerzielle film abende - Eintritt frei bei gern entgegengenommenen Spenden
        <br />
        <sup>2</sup> Kulinarische überreste fantasielos angerichtet - circa eine Stunde vor Filmbeginn
      </FootnotesStyled>
      <PerlLinkStyled href="https://www.youtube.com/watch?v=-8yTGXKUZJs" target="_blank" rel="noopener noreferrer">
        <PerlImageStyled src={piez} alt="Eine Pizza" />
      </PerlLinkStyled>
    </AboutPageStyled>
  );

  function handleClick(event) {
    if (!event.target.className.startsWith('Quote')) {
      setOpenPerls([]);
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

const MokryLinkStyled = styled.a`
  color: white;
`;

const QuotePerlsContainerStyled = styled.div`
  position: relative;
  height: ${(props) => Math.max(250, ...props.openPerls) + 'px'};
  margin-top: 20px;

  transition: ${(props) =>
    props.openPerls.length < props.numberOfOpenPerlsBefore ? 'height 1s linear 1s' : 'height 1s linear'};
`;

const FootnotesStyled = styled.div`
  margin: 40px auto 20px auto;
  max-width: 600px;
  color: white;
`;

const PerlLinkStyled = styled.a`
  margin-left: 200px;
`;

const PerlImageStyled = styled.img`
  height: 20px;
  width: 20px;
`;
