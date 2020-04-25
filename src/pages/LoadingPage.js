import React from 'react';
import styled from 'styled-components/macro';

export default function LoadingPage() {
  return <LoadingPageStyled>Loading</LoadingPageStyled>;
}

const LoadingPageStyled = styled.div`
  padding: 20px;
  color: white;
`;
