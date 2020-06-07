import React, { useState } from 'react';
import styled from 'styled-components/macro';
import redPerlImage from '../assets/perls/redPerl.png';

export default function QuotePerl({ quote, top, left }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  return (
    <QuotePerlStyled top={top} left={left} isOpen={isOpen} onClick={handlePerlClick}>
      <QuoteDisplayContainerStyled isOpen={isOpen}>
        <QuoteOpacityContainerStyled showQuote={showQuote}>
          <CloseButtonStyled onClick={handleCloseClick}>{'\u2716'}</CloseButtonStyled>
          <QuoteTextStyled>{quote.text}</QuoteTextStyled>
          <QuoteAuthorStyled>{quote.author}</QuoteAuthorStyled>
        </QuoteOpacityContainerStyled>
      </QuoteDisplayContainerStyled>
    </QuotePerlStyled>
  );

  function handlePerlClick() {
    console.log('perl');
    if (!isOpen) {
      console.log('open');
      setIsOpen(true);
      setTimeout(() => setShowQuote(true), 1000);
    }
  }

  function handleCloseClick() {
    console.log('close');
    setShowQuote(false);
    setTimeout(() => setIsOpen(false), 1000);
    // setIsOpen(false);
  }
}

const QuotePerlStyled = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: ${(props) => (props.isOpen ? '200px' : '20px')};
  height: ${(props) => (props.isOpen ? '200px' : '20px')};
  padding: 10px;
  background-image: url(${redPerlImage});
  color: white;

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
