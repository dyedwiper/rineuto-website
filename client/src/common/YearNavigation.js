import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import darkGreenPerlImage from '../assets/perls/darkGreenPerl.png';
import whitePerlImage from '../assets/perls/whitePerl.png';

export default function YearNavigation({ years, setSelectedYear, pagePath }) {
  let history = useHistory();

  useEffect(() => {
    let yearFromPath = window.location.pathname.slice(pagePath.length);
    if (!yearFromPath) {
      const latestYear = years[years.length - 1];
      history.push(pagePath + latestYear);
      setSelectedYear(latestYear);
    } else {
      setSelectedYear(yearFromPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <YearNavigationStyled>
      {years.map((year) => (
        <YearLinkStyled key={year} to={pagePath + year} onClick={() => setSelectedYear(year)}>
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
  color: var(--secondary-color);
  font-size: 1.5em;
  text-decoration: none;

  &.active {
    transform: skew(0deg, -13deg);
  }

  transition: all 1s;
`;
