import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';
import whitePerlImage from '../assets/perls/whitePerl.png';
import redPerlImage from '../assets/perls/redPerl.png';
import favicon from '../assets/favicon.png';
import darkGreenPerlImage from '../assets/perls/darkGreenPerl.png';

export default function Header({ isNavOpen, setIsNavOpen }) {
  const [title, setTitle] = useState('Rineuto Lichtspiele');
  let history = useHistory();

  const mql = window.matchMedia('(min-width: 900px)');
  mql.addListener(handleWidthChange);

  useEffect(() => {
    handleWidthChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HeaderStyled>
      <TitleStyled onClick={handleTitleClick}>{title}</TitleStyled>
      <PerlLinkStyled target="_blank" rel="noopener noreferrer" href="https://youtu.be/hKBfQdKvyXc">
        <PerlStyled src={favicon} />
        <PerlStyled src={favicon} />
      </PerlLinkStyled>
      <PerlMenuLabelStyled isNavOpen={isNavOpen}>
        <CheckboxStyled type="checkbox" onChange={() => setIsNavOpen(!isNavOpen)}></CheckboxStyled>
      </PerlMenuLabelStyled>
    </HeaderStyled>
  );

  function handleWidthChange() {
    if (mql.matches) {
      setTitle('Rineuto Lichtspiele - Filmperlen in der Mokry');
    } else {
      setTitle('Rineuto Lichtspiele');
    }
  }

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
  background-color: white;

  @media (min-width: 900px) {
    grid-column: 1 / 3;
  }
`;

const TitleStyled = styled.h1`
  margin: 0;
  padding-left: 20px;
  cursor: pointer;

  @media (max-width: 340px) {
    font-size: 1.75em;
  }
`;

const PerlLinkStyled = styled.a`
  position: absolute;
  top: 20px;
  left: 960px;
`;

const PerlStyled = styled.img`
  width: 20px;
  height: 20px;
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
