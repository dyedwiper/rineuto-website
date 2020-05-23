import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import whitePerlImage from '../assets/perls/whitePerl.png';
import { Link } from 'react-router-dom';
import UserContext from '../userContext';

export default function PostersList({ series, selectedYear }) {
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
              <LinkStyled to={'/intern/editSeries/' + series._id}>
                Bearbeiten
              </LinkStyled>
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

const LinkStyled = styled(Link)`
  display: block;
  padding-top: 10px;
  color: black;
  font-size: 1.5em;
  text-align: right;
`;