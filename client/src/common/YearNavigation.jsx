import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import darkGreenPerlImage from '../assets/perls/darkGreenPerl.png';
import whitePerlImage from '../assets/perls/whitePerl.png';

export default function YearNavigation({ years, setSelectedYear, pagePath }) {
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    let yearFromPath = window.location.pathname.slice(pagePath.length);
    if (!yearFromPath) {
      const latestYear = years[years.length - 1];
      navigate(pagePath + latestYear, { replace: true });
      setSelectedYear(latestYear);
    } else {
      setSelectedYear(yearFromPath);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const activeLink = document.querySelector('[class*=YearLinkStyled].active');
      activeLink.scrollIntoView({ block: 'end', inline: 'center' });
    }
  }, [isLoading]);

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
  margin: 10px;
  background-image: url(${whitePerlImage});
  color: var(--secondary-color);
  font-size: 1.5em;
  text-decoration: none;

  &.active {
    transform: skew(0deg, -13deg);
  }

  transition: all 1s;
`;
