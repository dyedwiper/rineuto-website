import React from 'react';
import styled from 'styled-components';

export default function NewsletterConfirmationPage() {
  return (
    <NewsletterConfirmationPageStyled>
      <HeadlineStyled>Newsletter</HeadlineStyled>
      <SuccessMessageStyled>Great Success!</SuccessMessageStyled>
    </NewsletterConfirmationPageStyled>
  );
}

const NewsletterConfirmationPageStyled = styled.div`
  padding: 20px;
  color: white;
  text-align: center;
`;

const HeadlineStyled = styled.h2``;

const SuccessMessageStyled = styled.p`
  color: chartreuse;
  font-size: 1.2em;
`;
