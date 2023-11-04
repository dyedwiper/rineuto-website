import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import whitePerlImage from '../assets/perls/whitePerl.png';
import { Link } from 'react-router-dom';
import Context from '../Context';

export default function PostersList({ serials, selectedYear, editedObject }) {
  const { isUserLoggedIn } = useContext(Context);

  return (
    <PosterListStyled>
      {serials
        .sort((a, b) => a.month - b.month)
        .map((serial) => (
          <PosterCardStyled key={serial._id}>
            <a href={serial.imageUrl} target="_blank" rel="noopener noreferrer">
              <PosterStyled src={serial.imageUrl} alt={serial.altText} />
            </a>
            {isUserLoggedIn && (
              <EditContainerStyled>
                {serial._id === editedObject._id && <EditNoteStyled>Änderungen gespeichert</EditNoteStyled>}
                <EditLinkStyled to={'/intern/editSerial/' + serial._id}>Bearbeiten</EditLinkStyled>
              </EditContainerStyled>
            )}
          </PosterCardStyled>
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

const PosterCardStyled = styled.li`
  position: relative;
  z-index: 2;
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
  color: var(--success-color);
  font-size: 1.3em;
`;

const EditLinkStyled = styled(Link)`
  grid-column-start: 2;
  justify-self: right;
  color: var(--secondary-color);
  font-size: 1.3em;
`;
