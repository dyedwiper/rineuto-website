import React from 'react';
import styled from 'styled-components';
import ooopsImage from '../assets/ooops.jpg';

export default function ErrorPage() {
  return (
    <ErrorPageStyled>
      <OoopsImageStyled src={ooopsImage} />
    </ErrorPageStyled>
  );
}

const ErrorPageStyled = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const OoopsImageStyled = styled.img`
  width: 100%;
`;
