import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import mapImage from '../assets/karte.png';

export default function ImprintPage() {
  useEffect(() => {
    document.title = 'Impressum | Rineuto Lichtspiele';
  }, []);

  return (
    <ImprintPageStyled>
      <div>Mokryhütten e.V.</div>
      <div>Mokrystraße 1</div>
      <div>21107 Hamburg</div>
      <div>kontakt.mokryhuetten(ät)posteo.de</div>
      <br />
      <a
        href="https://www.openstreetmap.de/karte.html?zoom=19&lat=53.51843&lon=9.98398&layers=B000TT"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MapImageStyled src={mapImage} />
      </a>
      <br />
      <br />
      <div>Programmierung und Gestaltung:</div>
      <div>max_becker(ät)posteo.de</div>
      <br />
      <FacebookLinkStyled href="https://www.facebook.com/rineuto" target="_blank" rel="noopener noreferrer">
        Rineuto on facebook
      </FacebookLinkStyled>
      <br />
      <br />
      <div>Jugendschutzbeauftragter: Fabian Schauren </div>
      <div>(jugendschutz@kommunale-kinos.de)</div>
    </ImprintPageStyled>
  );
}

const ImprintPageStyled = styled.div`
  padding: 20px;
  color: white;
  font-size: 1.2em;

  @media (min-width: 900px) {
    padding: 40px;
    font-size: 1.5em;
  }
`;

const MapImageStyled = styled.img`
  max-width: 600px;
  width: 100%;
`;

const FacebookLinkStyled = styled.a`
  color: white;
`;
