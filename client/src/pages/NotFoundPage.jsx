import React, { useEffect } from 'react';
import styled from 'styled-components';
import ironsImage from '../assets/waitsIrons.jpg';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = ' 404 | Rineuto Lichtspiele';
  }, []);

  return (
    <NotFoundPageStyled>
      <IronsImageStyled src={ironsImage} alt="Tom Waits while Jeremy Irons" />
      <NotFoundTextStyled>But you're gonna wait forever. There's nothing here.</NotFoundTextStyled>
    </NotFoundPageStyled>
  );
}

const NotFoundPageStyled = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  color: var(--primary-color);
`;

const IronsImageStyled = styled.img`
  width: 100%;
`;

const NotFoundTextStyled = styled.div`
  font-size: 1.4em;
`;
