import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import redPerlImage from '../assets/perls/redPerl.png';

export default function QuotePerl({ quote, top, left }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const pseudoQuote = useRef(null);
  const quoteHeight = useRef(null);

  useEffect(() => {
    console.log(pseudoQuote.current.offsetHeight);
    const pseudoHeight = pseudoQuote.current.offsetHeight;
    const actualHeight = pseudoHeight % 20 === 0 ? pseudoHeight : pseudoHeight - (pseudoHeight % 20) + 20;
    console.log('actualHeight', actualHeight);
    quoteHeight.current = actualHeight;
  }, []);

  return (
    <>
      <QuotePerlStyled
        top={top}
        left={left}
        quoteHeight={quoteHeight.current}
        isOpen={isOpen}
        onClick={handlePerlClick}
      >
        <QuoteDisplayContainerStyled isOpen={isOpen}>
          <QuoteOpacityContainerStyled showQuote={showQuote}>
            <CloseButtonStyled onClick={handleCloseClick}>{'\u2716'}</CloseButtonStyled>
            <QuoteTextStyled>{quote.text}</QuoteTextStyled>
            <QuoteAuthorStyled>{quote.author}</QuoteAuthorStyled>
          </QuoteOpacityContainerStyled>
        </QuoteDisplayContainerStyled>
      </QuotePerlStyled>
      <PseudoQuoteStyled ref={pseudoQuote}>
        <CloseButtonStyled onClick={handleCloseClick}>{'\u2716'}</CloseButtonStyled>
        <QuoteTextStyled>{quote.text}</QuoteTextStyled>
        <QuoteAuthorStyled>{quote.author}</QuoteAuthorStyled>
      </PseudoQuoteStyled>
    </>
  );

  function handlePerlClick() {
    console.log(quoteHeight);
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setShowQuote(true), 1000);
    }
  }

  function handleCloseClick() {
    setShowQuote(false);
    setTimeout(() => setIsOpen(false), 1000);
  }
}

const QuotePerlStyled = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: ${(props) => (props.isOpen ? '200px' : '20px')};
  height: ${(props) => (props.isOpen ? props.quoteHeight + 'px' : '20px')};
  padding: 10px;
  background-image: url(${redPerlImage});
  color: white;
  cursor: ${(props) => (props.isOpen ? 'auto' : 'pointer')};

  transition: width 1s linear, height 1s linear;
`;

const QuoteDisplayContainerStyled = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const QuoteOpacityContainerStyled = styled.div`
  opacity: ${(props) => (props.showQuote ? '1' : '0')};
  transition: opacity 1s linear;
`;

const CloseButtonStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

const QuoteTextStyled = styled.p``;

const QuoteAuthorStyled = styled.span``;

const PseudoQuoteStyled = styled.div`
  position: absolute;
  left: 10000px;
  width: 200px;
  padding: 10px;
`;
