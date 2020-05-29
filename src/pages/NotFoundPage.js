import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = ' 404 | Rineuto Lichtspiele';
  }, []);

  return <NotFoundPageStyled>Not Found</NotFoundPageStyled>;
}

const NotFoundPageStyled = styled.div`
  padding: 20px;
  color: white;
`;
