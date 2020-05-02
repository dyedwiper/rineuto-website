import React from 'react';
import styled from 'styled-components/macro';

export default function ImprintPage() {
  return (
    <ImprintPageStyled>
      <div>Mokryhütten e.V.</div>
      <div>Mokrystraße 1</div>
      <div>21107 Hamburg</div>
      <br />
      <div>kontakt.mokryhuetten@posteo.de</div>
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
