import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import glubsch from '../assets/glubsch.png';
import darkGreenPerlImage from '../assets/perls/darkGreenPerl.png';
import redPerlImage from '../assets/perls/redPerl.png';
import whitePerlImage from '../assets/perls/whitePerl.png';

export default function Header({ isNavOpen, setIsNavOpen }) {
  let history = useHistory();

  return (
    <HeaderStyled>
      <TitleStyled onClick={handleTitleClick}>
        Rineuto Lichtspiele <SubtitleStyled>- Filmperlen im M1</SubtitleStyled>
      </TitleStyled>
      <PerlLinkStyled target="_blank" rel="noopener noreferrer" href="https://youtu.be/hKBfQdKvyXc">
        <PerlStyled src={glubsch} alt="Glubschauge" />
      </PerlLinkStyled>
      <PerlMenuLabelStyled isNavOpen={isNavOpen}>
        <CheckboxStyled type="checkbox" onChange={() => setIsNavOpen(!isNavOpen)}></CheckboxStyled>
      </PerlMenuLabelStyled>
    </HeaderStyled>
  );

  function handleTitleClick() {
    history.push('/');
    setIsNavOpen(false);
  }
}

const HeaderStyled = styled.header`
  display: grid;
  grid-template-columns: max-content;
  align-items: center;
  background-image: url(${whitePerlImage});
  background-color: var(--primary-color);

  @media (min-width: 900px) {
    grid-column: 1 / 3;
  }
`;

const TitleStyled = styled.h1`
  margin: 0;
  padding-left: 20px;
  cursor: pointer;
  color: var(--secondary-color);

  @media (max-width: 340px) {
    font-size: 1.75em;
  }
`;

const SubtitleStyled = styled.span`
  @media (max-width: 900px) {
    display: none;
  }
`;

const PerlLinkStyled = styled.a`
  position: absolute;
  top: 20px;
  left: 980px;
`;

const PerlStyled = styled.img`
  width: 20px;
  height: 20px;
  transform: scaleX(-1);
`;

const CheckboxStyled = styled.input`
  display: none;
`;

const PerlMenuLabelStyled = styled.label`
  position: absolute;
  top: 20px;
  right: ${(window.innerWidth % 20 === 0 ? 20 : window.innerWidth % 20) + 'px'};
  width: 20px;
  height: 20px;
  background-image: ${(props) => (props.isNavOpen ? `url(${redPerlImage})` : `url(${darkGreenPerlImage})`)};
  background-color: ${(props) => (props.isNavOpen ? 'red' : 'green')};

  @media (min-width: 600px) {
    right: ${(window.innerWidth % 20 === 0 ? 40 : (window.innerWidth % 20) + 20) + 'px'};
  }

  @media (min-width: 900px) {
    display: none;
  }
`;
