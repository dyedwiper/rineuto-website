import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import whitePerlImage from '../assets/perls/whitePerl.png';
import { Link } from 'react-router-dom';
import UserContext from '../userContext';

export default function PostersList({ series, selectedYear, editedObject }) {
  const { user } = useContext(UserContext);
  const loggedIn = Object.keys(user).length !== 0;

  return (
    <PosterListStyled>
      {series
        .sort((a, b) => a.month - b.month)
        .map((series) => (
          <PosterItemStyled key={series._id}>
            <a href={process.env.PUBLIC_URL + series.imageUrl}>
              <PosterStyled src={process.env.PUBLIC_URL + series.imageUrl} />
            </a>
            {loggedIn && (
              <EditContainerStyled>
                {series._id === editedObject._id && <EditNoteStyled>Änderungen gespeichert</EditNoteStyled>}
                <EditLinkStyled to={'/intern/editSeries/' + series._id}>Bearbeiten</EditLinkStyled>
              </EditContainerStyled>
            )}
          </PosterItemStyled>
        ))}
    </PosterListStyled>
  );
}

const PosterListStyled = styled.ul`
  display: grid;
  grid-template-rows: min-content;
  grid-template-columns: 320px;
  grid-gap: 40px;
  justify-content: center;
  margin: 0;
  padding: 40px;
  list-style: none;

  @media (min-width: 760px) {
    grid-template-columns: 320px 320px;
  }
`;

const PosterItemStyled = styled.li`
  width: 320px;
  padding: 20px;
  background-image: url(${whitePerlImage});
`;

const PosterStyled = styled.img`
  width: 280px;
`;

const EditContainerStyled = styled.div`
  padding-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const EditNoteStyled = styled.span`
  color: green;
  font-size: 1.3em;
`;

const EditLinkStyled = styled(Link)`
  grid-column-start: 2;
  justify-self: right;
  color: black;
  font-size: 1.3em;
`;
