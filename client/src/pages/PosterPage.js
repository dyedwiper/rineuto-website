import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import PostersList from '../common/PostersList';
import YearNavigation from '../common/YearNavigation';
import { useHistory } from 'react-router-dom';
import eightBall from '../assets/eightBall.png';

export default function PosterPage({ serials, editedObject }) {
  const allYears = serials
    .map((serial) => serial.year)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);
  const latestYear = allYears[allYears.length - 1];

  let history = useHistory();

  const [selectedYear, setSelectedYear] = useState(latestYear);

  useEffect(() => {
    document.title = 'Plakate | Rineuto Lichtspiele';
  }, []);

  useEffect(() => {
    let yearFromPath = window.location.pathname.slice(9);
    if (!yearFromPath) {
      history.push('/posters/' + latestYear);
    }
    if (yearFromPath.endsWith('/')) {
      yearFromPath = yearFromPath.slice(0, -1);
    }
    setSelectedYear(yearFromPath);
  }, [latestYear, history, history.location.pathname]);

  return (
    <PosterPageStyled>
      <YearNavigation
        years={allYears}
        setSelectedYear={setSelectedYear}
        pagePath={history.location.pathname.split('/', 2).join('/') + '/'}
      />
      {editedObject.added === 'serial' && <EditNoteStyled>Filmreihe hinzugefügt</EditNoteStyled>}
      {editedObject.deleted === 'serial' && <EditNoteStyled>Filmreihe gelöscht</EditNoteStyled>}
      <PostersList
        // eslint-disable-next-line eqeqeq
        serials={serials.filter((serial) => serial.year == selectedYear)}
        editedObject={editedObject}
      />
      <PerlLinkStyled href="https://www.youtube.com/watch?v=fsAE2jFPqLw" target="_blank" rel="noopener noreferrer">
        <EightBallImageStyled src={eightBall} alt="Ein 8 ball" />
      </PerlLinkStyled>
    </PosterPageStyled>
  );
}

const PosterPageStyled = styled.div``;

const EditNoteStyled = styled.div`
  margin: 20px;
  color: var(--success-color);
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;

const PerlLinkStyled = styled.a`
  position: absolute;
  top: 300px;
  left: 160px;
  z-index: 1;

  @media (min-width: 900px) {
    left: 400px;
  }
`;

const EightBallImageStyled = styled.img`
  height: 20px;
  width: 20px;
`;
