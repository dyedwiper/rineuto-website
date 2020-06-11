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
import skinPerlImage from '../assets/perls/skinPerl.png';
import whitePerlImage from '../assets/perls/whitePerl.png';
import yellowPerlImage from '../assets/perls/yellowPerl.png';
import redPerlImage from '../assets/perls/redPerl.png';
import LoadingPage from '../pages/LoadingPage';

export default function QuotePerl({ quote, top, left, perlColor, textColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const pseudoQuote = useRef(null);
  const quoteHeight = useRef(null);
  const perl = useRef(null);

  useEffect(() => {
    if (perlColor === 'adobe') perl.current = adobePerlImage;
    if (perlColor === 'babyBlue') perl.current = babyBluePerlImage;
    if (perlColor === 'black') perl.current = blackPerlImage;
    if (perlColor === 'blue') perl.current = bluePerlImage;
    if (perlColor === 'chamois') perl.current = chamoisPerlImage;
    if (perlColor === 'darkBlue') perl.current = darkBluePerlImage;
    if (perlColor === 'darkGreen') perl.current = darkGreenPerlImage;
    if (perlColor === 'darkRed') perl.current = darkRedPerlImage;
    if (perlColor === 'flieder') perl.current = fliederPerlImage;
    if (perlColor === 'green') perl.current = greenPerlImage;
    if (perlColor === 'greyLightBrown') perl.current = greyLightBrownPerlImage;
    if (perlColor === 'grey') perl.current = greyPerlImage;
    if (perlColor === 'lightGreen') perl.current = lightGreenPerlImage;
    if (perlColor === 'lightGrey') perl.current = lightGreyPerlImage;
    if (perlColor === 'lightOrange') perl.current = lightOrangePerlImage;
    if (perlColor === 'lightYellow') perl.current = lightYellowPerlImage;
    if (perlColor === 'mandarine') perl.current = mandarinePerlImage;
    if (perlColor === 'olive') perl.current = olivePerlImage;
    if (perlColor === 'orange') perl.current = orangePerlImage;
    if (perlColor === 'pink') perl.current = pinkPerlImage;
    if (perlColor === 'purple') perl.current = purplePerlImage;
    if (perlColor === 'red') perl.current = redPerlImage;
    if (perlColor === 'skin') perl.current = skinPerlImage;
    if (perlColor === 'white') perl.current = whitePerlImage;
    if (perlColor === 'yellow') perl.current = yellowPerlImage;
    setIsLoading(false);
  }, [perlColor]);

  useEffect(() => {
    if (!isLoading) {
      const pseudoHeight = pseudoQuote.current.offsetHeight;
      const actualHeight = pseudoHeight % 20 === 0 ? pseudoHeight : pseudoHeight - (pseudoHeight % 20) + 20;
      quoteHeight.current = actualHeight;
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <QuotePerlStyled
      top={top}
      left={left}
      quoteHeight={quoteHeight.current}
      isOpen={isOpen}
      onClick={handlePerlClick}
      perl={perl.current}
      textColor={textColor}
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
}

const QuotePerlStyled = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  z-index: ${(props) => (props.isOpen ? '99' : 'auto')};
  overflow: hidden;
  width: ${(props) => (props.isOpen ? '300px' : '20px')};
  height: ${(props) => (props.isOpen ? props.quoteHeight + 'px' : '20px')};
  margin-bottom: ${(props) => (props.isOpen ? '40px' : '0')};
  padding: 10px;
  background-image: ${(props) => `url(${props.perl})`};
  color: ${(props) => props.textColor};
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
  width: 300px;
  padding: 10px;
`;
