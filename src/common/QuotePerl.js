import React, { useState } from 'react';
import styled from 'styled-components';
import redPerlImage from '../assets/perls/redPerl.png';

export default function QuotePerl({ top, left }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <QuotePerlStyled top={top} left={left} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
      {isOpen && (
        <QuoteTextStyled>
          "Ein guter Film hat kein Genre, genausowenig wie das echte Leben. In einem Moment ist es eine Komödie, im
          nächsten eine Tragödie."
        </QuoteTextStyled>
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
