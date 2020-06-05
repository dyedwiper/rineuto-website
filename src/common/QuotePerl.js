import React, { useState } from 'react';
import styled from 'styled-components';
import redPerlImage from '../assets/perls/redPerl.png';

export default function QuotePerl({ quote, top, left }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <QuotePerlStyled top={top} left={left} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
      {isOpen && (
        <>
          <QuoteTextStyled>{quote.text}</QuoteTextStyled>
          <QuoteAuthorStyled>{quote.author}</QuoteAuthorStyled>
        </>
      )}
    </QuotePerlStyled>
  );
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
`;

const QuoteTextStyled = styled.p``;

const QuoteAuthorStyled = styled.span``;
