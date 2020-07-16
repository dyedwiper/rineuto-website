import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import PostersList from '../common/PostersList';
import YearNavigation from '../common/YearNavigation';
import { useHistory } from 'react-router-dom';

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
    </PosterPageStyled>
  );
}

const PosterPageStyled = styled.div``;

const EditNoteStyled = styled.div`
  margin: 20px;
  color: green;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;
