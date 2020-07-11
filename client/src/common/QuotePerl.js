import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import adobePerlImage from '../assets/perls/adobePerl.png';
import blackPerlImage from '../assets/perls/blackPerl.png';
import bluePerlImage from '../assets/perls/bluePerl.png';
import darkBluePerlImage from '../assets/perls/darkBluePerl.png';
import darkGreenPerlImage from '../assets/perls/darkGreenPerl.png';
import darkRedPerlImage from '../assets/perls/darkRedPerl.png';
import greenPerlImage from '../assets/perls/greenPerl.png';
import lightGreenPerlImage from '../assets/perls/lightGreenPerl.png';
import lightOrangePerlImage from '../assets/perls/lightOrangePerl.png';
import lightYellowPerlImage from '../assets/perls/lightYellowPerl.png';
import mandarinePerlImage from '../assets/perls/mandarinePerl.png';
import olivePerlImage from '../assets/perls/olivePerl.png';
import orangePerlImage from '../assets/perls/orangePerl.png';
import pinkPerlImage from '../assets/perls/pinkPerl.png';
import purplePerlImage from '../assets/perls/purplePerl.png';
import redPerlImage from '../assets/perls/redPerl.png';
import whitePerlImage from '../assets/perls/whitePerl.png';
import yellowPerlImage from '../assets/perls/yellowPerl.png';

export default function QuotePerl({ quote, container, numberOfOpenPerls, setNumberOfOpenPerls }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChoosingColor, setIsChoosingColor] = useState(true);
  const [isCalculatingPosition, setIsCalculatingPosition] = useState(true);
  const [zIndex, setZIndex] = useState(0);

  const pseudoQuote = useRef(null);
  const quoteHeight = useRef(null);
  const quotePosition = useRef(null);
  const textColor = useRef(null);
  const perl = useRef(null);

  useEffect(() => {
    choosePerlColor(perl, textColor);
    setIsChoosingColor(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const top = getRandomInt(10) * 20 + 40;
    const isOnRightSide = left > containerWidth / 2;
    quotePosition.current = { top: top, left: left, isOnRightSide: isOnRightSide };
    setIsCalculatingPosition(false);
  }, [container]);

  useEffect(() => {
    if (isOpen) {
      setZIndex(numberOfOpenPerls);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!numberOfOpenPerls) {
      setIsOpen(false);
    }
  }, [numberOfOpenPerls]);

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
      onClick={handlePerlClick}
      perl={perl.current}
      textColor={textColor.current}
      zIndex={zIndex}
    >
      <QuoteVisibilityContainerStyled isOpen={isOpen}>
        <QuoteOpacityContainerStyled isOpen={isOpen}>
          <CloseButtonStyled onClick={handleCloseClick}>{'\u2716'}</CloseButtonStyled>
          <QuoteTextStyled>{quote.text}</QuoteTextStyled>
          <QuoteAuthorStyled>{quote.author}</QuoteAuthorStyled>
        </QuoteOpacityContainerStyled>
      </QuoteVisibilityContainerStyled>
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
      setNumberOfOpenPerls(numberOfOpenPerls + 1);
    }
  }

  function handleCloseClick() {
    setNumberOfOpenPerls(numberOfOpenPerls - 1);
    setIsOpen(false);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function choosePerlColor(perl, textColor) {
    const randomInt = getRandomInt(18);
    textColor.current = 'white';
    switch (randomInt) {
      case 0:
        perl.current = adobePerlImage;
        break;
      case 1:
        perl.current = blackPerlImage;
        break;
      case 2:
        perl.current = bluePerlImage;
        break;
      case 3:
        perl.current = darkBluePerlImage;
        break;
      case 4:
        perl.current = darkGreenPerlImage;
        break;
      case 5:
        perl.current = darkRedPerlImage;
        break;
      case 6:
        perl.current = greenPerlImage;
        break;
      case 7:
        perl.current = lightGreenPerlImage;
        break;
      case 8:
        perl.current = lightOrangePerlImage;
        textColor.current = 'black';
        break;
      case 9:
        perl.current = lightYellowPerlImage;
        textColor.current = 'black';
        break;
      case 10:
        perl.current = mandarinePerlImage;
        break;
      case 11:
        perl.current = olivePerlImage;
        break;
      case 12:
        perl.current = orangePerlImage;
        break;
      case 13:
        perl.current = pinkPerlImage;
        break;
      case 14:
        perl.current = purplePerlImage;
        break;
      case 15:
        perl.current = redPerlImage;
        break;
      case 16:
        perl.current = whitePerlImage;
        textColor.current = 'black';
        break;
      default:
        perl.current = yellowPerlImage;
        textColor.current = 'black';
        break;
    }
  }
}

const QuotePerlStyled = styled.div`
  position: absolute;
  top: ${(props) => props.top + 'px'};
  left: ${(props) =>
    props.isOpen ? (props.isOnRightSide ? props.left - 180 + 'px' : props.left + 'px') : props.left + 'px'};
  z-index: ${(props) => (props.isOpen ? props.zIndex : '0')};
  overflow: hidden;
  width: ${(props) => (props.isOpen ? '200px' : '20px')};
  height: ${(props) => (props.isOpen ? props.quoteHeight + 'px' : '20px')};
  margin-bottom: ${(props) => (props.isOpen ? '40px' : '0')};
  padding: 10px;
  background-image: ${(props) => `url(${props.perl})`};
  color: ${(props) => props.textColor};
  cursor: ${(props) => (props.isOpen ? 'auto' : 'pointer')};

  transition: ${(props) =>
    props.isOpen
      ? 'width 1s linear, height 1s linear, left 1s linear'
      : 'width 1s linear 1s, height 1s linear 1s, left 1s linear 1s, z-index 0s linear 2s'};

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

const QuoteVisibilityContainerStyled = styled.div`
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  transition-delay: ${(props) => (props.isOpen ? '0s' : '1s')};
  transition-property: visibility;
`;

const QuoteOpacityContainerStyled = styled.div`
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  transition: ${(props) => (props.isOpen ? 'opacity 1s linear 1s' : 'opacity 1s linear')};
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
