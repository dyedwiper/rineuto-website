import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import darkGreenPerlImage from '../assets/perls/darkGreenPerl.png';
import whitePerlImage from '../assets/perls/whitePerl.png';

export default function YearNavigation({ years }) {
  return (
    <YearNavigationStyled>
      {years.map((year) => (
        <YearLinkStyled key={year} to="#">
          {year}
        </YearLinkStyled>
      ))}
    </YearNavigationStyled>
  );
}

const YearNavigationStyled = styled.nav`
  padding: 10px;
  background-image: url(${darkGreenPerlImage});

  @media (max-width: 900px) {
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const YearLinkStyled = styled(Link)`
  display: inline-grid;
  place-items: center;
  width: 80px;
  height: 40px;
  margin: 10px 10px;
  padding: auto;
  background-image: url(${whitePerlImage});
  color: black;
  font-size: 1.5em;
  text-decoration: none;
`;
