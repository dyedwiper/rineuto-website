import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { choosePerlColor } from '../utils/quotePerlUtils';

export default function QuotePerl({ quote, container }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [isInForeground, setIsInForeground] = useState(false);
  const [isChoosingColor, setIsChoosingColor] = useState(true);
  const [isCalculatingPosition, setIsCalculatingPosition] = useState(true);

  const pseudoQuote = useRef(null);
  const quoteHeight = useRef(null);
  const quotePosition = useRef(null);
  const textColor = useRef(null);
  const perl = useRef(null);

  useEffect(() => {
    choosePerlColor(perl, textColor);
    setIsChoosingColor(false);
  }, []);

  useEffect(() => {
    if (!isChoosingColor) {
      const pseudoHeight = pseudoQuote.current.offsetHeight;
      const actualHeight = pseudoHeight % 20 === 0 ? pseudoHeight : pseudoHeight - (pseudoHeight % 20) + 20;
      quoteHeight.current = actualHeight;
    }
  }, [isChoosingColor]);

  useEffect(() => {
    const containerWidth = container.current.offsetWidth;
    const left = Math.max(40, getRandomInt(containerWidth / 20) * 20 - 20);
    const top = getRandomInt(20) * 20 + 40;
    const isOnRightSide = left > containerWidth / 2;
    quotePosition.current = { top: top, left: left, isOnRightSide: isOnRightSide };
    setIsCalculatingPosition(false);
  }, [container]);

  if (isChoosingColor || isCalculatingPosition) {
    return <></>;
  }

  return (
    <QuotePerlStyled
      top={quotePosition.current.top}
      left={quotePosition.current.left}
      isOnRightSide={quotePosition.current.isOnRightSide}
      quoteHeight={quoteHeight.current}
      isOpen={isOpen}
      isInForeground={isInForeground}
      onClick={handlePerlClick}
      perl={perl.current}
      textColor={textColor.current}
    >
      <QuoteDisplayContainerStyled isOpen={isOpen}>
        <QuoteOpacityContainerStyled showQuote={showQuote}>
          <CloseButtonStyled onClick={handleCloseClick}>{'\u2716'}</CloseButtonStyled>
          <QuoteTextStyled>{quote.text}</QuoteTextStyled>
          <QuoteAuthorStyled>{quote.author}</QuoteAuthorStyled>
        </QuoteOpacityContainerStyled>
      </QuoteDisplayContainerStyled>
      <PseudoQuoteStyled ref={pseudoQuote}>
        <CloseButtonStyled onClick={handleCloseClick}>{'\u2716'}</CloseButtonStyled>
        <QuoteTextStyled>{quote.text}</QuoteTextStyled>
        <QuoteAuthorStyled>{quote.author}</QuoteAuthorStyled>
      </PseudoQuoteStyled>
    </QuotePerlStyled>
  );

  function handlePerlClick() {
    if (!isOpen) {
      setIsOpen(true);
      setIsInForeground(true);
      setTimeout(() => setShowQuote(true), 1000);
    }
  }

  function handleCloseClick() {
    setShowQuote(false);
    setTimeout(() => setIsOpen(false), 1000);
    setTimeout(() => setIsInForeground(false), 2000);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

const QuotePerlStyled = styled.div`
  position: absolute;
  top: ${(props) => props.top + 'px'};
  left: ${(props) =>
    props.isOpen ? (props.isOnRightSide ? props.left - 180 + 'px' : props.left + 'px') : props.left + 'px'};
  z-index: ${(props) => (props.isInForeground ? '99' : 'auto')};
  overflow: hidden;
  width: ${(props) => (props.isOpen ? '200px' : '20px')};
  height: ${(props) => (props.isOpen ? props.quoteHeight + 'px' : '20px')};
  margin-bottom: ${(props) => (props.isOpen ? '40px' : '0')};
  padding: 10px;
  background-image: ${(props) => `url(${props.perl})`};
  color: ${(props) => props.textColor};
  cursor: ${(props) => (props.isOpen ? 'auto' : 'pointer')};

  transition: width 1s linear, height 1s linear, left 1s linear;

  @media (max-width: 400px) {
    left: ${(props) =>
      props.isOpen ? (props.isOnRightSide ? props.left - 140 + 'px' : props.left + 'px') : props.left + 'px'};
    width: ${(props) => (props.isOpen ? '160px' : '20px')};
  }

  @media (min-width: 900px) {
    left: ${(props) =>
      props.isOpen ? (props.isOnRightSide ? props.left - 280 + 'px' : props.left + 'px') : props.left + 'px'};
    width: ${(props) => (props.isOpen ? '300px' : '20px')};
  }
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

  @media (max-width: 400px) {
    width: 160px;
  }

  @media (min-width: 900px) {
    width: 300px;
  }
`;
