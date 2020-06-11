import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import adobePerlImage from '../assets/perls/adobePerl.png';
import babyBluePerlImage from '../assets/perls/babyBluePerl.png';
import blackPerlImage from '../assets/perls/blackPerl.png';
import bluePerlImage from '../assets/perls/bluePerl.png';
import chamoisPerlImage from '../assets/perls/chamoisPerl.png';
import darkBluePerlImage from '../assets/perls/darkBluePerl.png';
import darkGreenPerlImage from '../assets/perls/darkGreenPerl.png';
import darkRedPerlImage from '../assets/perls/darkRedPerl.png';
import fliederPerlImage from '../assets/perls/fliederPerl.png';
import greenPerlImage from '../assets/perls/greenPerl.png';
import greyLightBrownPerlImage from '../assets/perls/greyLightBrownPerl.png';
import greyPerlImage from '../assets/perls/greyPerl.png';
import lightGreenPerlImage from '../assets/perls/lightGreenPerl.png';
import lightGreyPerlImage from '../assets/perls/lightGreyPerl.png';
import lightOrangePerlImage from '../assets/perls/lightOrangePerl.png';
import lightYellowPerlImage from '../assets/perls/lightYellowPerl.png';
import mandarinePerlImage from '../assets/perls/mandarinePerl.png';
import olivePerlImage from '../assets/perls/olivePerl.png';
import orangePerlImage from '../assets/perls/orangePerl.png';
import pinkPerlImage from '../assets/perls/pinkPerl.png';
import purplePerlImage from '../assets/perls/purplePerl.png';
import redPerlImage from '../assets/perls/redPerl.png';
import skinPerlImage from '../assets/perls/skinPerl.png';
import whitePerlImage from '../assets/perls/whitePerl.png';
import yellowPerlImage from '../assets/perls/yellowPerl.png';

export default function QuotePerl({ quote, container }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [isChoosingColor, setIsChoosingColor] = useState(true);
  const [isCalculatingPosition, setIsCalculatingPosition] = useState(true);

  const pseudoQuote = useRef(null);
  const quoteHeight = useRef(null);
  const quotePosition = useRef(null);
  const textColor = useRef(null);
  const perl = useRef(null);

  useEffect(() => {
    const randomInt = getRandomInt(25);
    textColor.current = 'white';
    switch (randomInt) {
      case 0:
        perl.current = adobePerlImage;
        break;
      case 1:
        perl.current = babyBluePerlImage;
        textColor.current = 'black';
        break;
      case 2:
        perl.current = blackPerlImage;
        break;
      case 3:
        perl.current = bluePerlImage;
        break;
      case 4:
        perl.current = chamoisPerlImage;
        textColor.current = 'black';
        break;
      case 5:
        perl.current = darkBluePerlImage;
        break;
      case 6:
        perl.current = darkGreenPerlImage;
        break;
      case 7:
        perl.current = darkRedPerlImage;
        break;
      case 8:
        perl.current = fliederPerlImage;
        break;
      case 9:
        perl.current = greenPerlImage;
        break;
      case 10:
        perl.current = greyLightBrownPerlImage;
        break;
      case 11:
        perl.current = greyPerlImage;
        break;
      case 12:
        perl.current = lightGreenPerlImage;
        break;
      case 13:
        perl.current = lightGreyPerlImage;
        textColor.current = 'black';
        break;
      case 14:
        perl.current = lightOrangePerlImage;
        textColor.current = 'black';
        break;
      case 15:
        perl.current = lightYellowPerlImage;
        textColor.current = 'black';
        break;
      case 16:
        perl.current = mandarinePerlImage;
        break;
      case 17:
        perl.current = olivePerlImage;
        break;
      case 18:
        perl.current = orangePerlImage;
        break;
      case 19:
        perl.current = pinkPerlImage;
        break;
      case 20:
        perl.current = purplePerlImage;
        break;
      case 21:
        perl.current = redPerlImage;
        break;
      case 22:
        perl.current = skinPerlImage;
        textColor.current = 'black';
        break;
      case 23:
        perl.current = whitePerlImage;
        textColor.current = 'black';
        break;
      default:
        perl.current = yellowPerlImage;
        textColor.current = 'black';
        break;
    }
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
      setTimeout(() => setShowQuote(true), 1000);
    }
  }

  function handleCloseClick() {
    setShowQuote(false);
    setTimeout(() => setIsOpen(false), 1000);
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
  z-index: ${(props) => (props.isOpen ? '99' : 'auto')};
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
