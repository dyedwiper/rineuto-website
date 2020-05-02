import React from 'react';
import styled from 'styled-components/macro';
import orangePerlImage from '../assets/perls/orangePerl.png';

export default function YearNavigation({ years }) {
  const yearsPassed = years.length;
  console.log('yearsPassed', yearsPassed);

  return (
    <YearNavigationStyled>
      {years.map((year) => (
        <YearButtonStyled key={year} yearsPassed={yearsPassed}>
          {year}
        </YearButtonStyled>
      ))}
    </YearNavigationStyled>
  );
}

const YearNavigationStyled = styled.nav`
  background-image: url(${orangePerlImage});
  padding: 10px;

  @media (max-width: 900px) {
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const YearButtonStyled = styled.button`
  width: 80px;
  height: 40px;
  margin: 10px 10px;
  padding: 10px;
  font-size: 1.3em;
`;
