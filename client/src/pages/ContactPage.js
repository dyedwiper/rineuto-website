import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import mapImage from '../assets/karte.png';
import lightGreyPerlImage from '../assets/perls/lightGreyPerl.png';

export default function ImprintPage() {
  useEffect(() => {
    document.title = 'Impressum | Rineuto Lichtspiele';
  }, []);

  return (
    <ImprintPageStyled>
      <div>Mokryhütten e.V.</div>
      <div>Mokrystraße 1</div>
      <div>(neben den alten Rialto Lichtspielen)</div>
      <div>21107 Hamburg</div>
      <div>rineuto(ät)posteo.de</div>
      <br />
      <FacebookLinkStyled href="https://www.facebook.com/rineuto" target="_blank" rel="noopener noreferrer">
        Rineuto on facebook
      </FacebookLinkStyled>
      <br />
      <br />
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
      <div>Jugendschutzbeauftragter: Fabian Schauren </div>
      <div>(jugendschutz(ät)kommunale-kinos.de)</div>
      <PerlLinkStyled target="_blank" rel="noopener noreferrer" href="https://youtu.be/fMkuQTVlFic">
        <Perl1Styled src={lightGreyPerlImage} />
        <Perl2Styled src={lightGreyPerlImage} />
        <Perl3Styled src={lightGreyPerlImage} />
        <Perl4Styled src={lightGreyPerlImage} />
        <Perl5Styled src={lightGreyPerlImage} />
        <Perl6Styled src={lightGreyPerlImage} />
        <Perl7Styled src={lightGreyPerlImage} />
      </PerlLinkStyled>
    </ImprintPageStyled>
  );
}

const ImprintPageStyled = styled.div`
  position: relative;
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

const PerlLinkStyled = styled.a`
  position: absolute;
  top: 120px;
  left: 240px;
  display: grid;
  grid-template-areas:
    '. one .'
    'two three four'
    'five six seven';

  @media (min-width: 900px) {
    top: 180px;
    left: 400px;
  }
`;

const Perl1Styled = styled.img`
  grid-area: one;
`;
const Perl2Styled = styled.img`
  grid-area: two;
`;
const Perl3Styled = styled.img`
  grid-area: three;
`;
const Perl4Styled = styled.img`
  grid-area: four;
`;
const Perl5Styled = styled.img`
  grid-area: five;
`;
const Perl6Styled = styled.img`
  grid-area: six;
`;
const Perl7Styled = styled.img`
  grid-area: seven;
`;
