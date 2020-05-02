import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import darkGreenPerlImage from '../assets/perls/darkGreenPerl.png';
import whitePerlImage from '../assets/perls/whitePerl.png';

export default function YearNavigation({ hithertoYears, setSelectedYear }) {
  return (
    <YearNavigationStyled>
      {hithertoYears.map((year) => (
        <YearLinkStyled
          key={year}
          to={'/posters/' + year}
          onClick={() => setSelectedYear(year)}
        >
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

const YearLinkStyled = styled(NavLink)`
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

  &.active {
    transform: skew(0deg, -13deg);
  }
`;
