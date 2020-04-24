import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';
import whitePerlImage from '../assets/whitePerl.png';
import redPerlImage from '../assets/redPerl.png';
import darkGreenPerlImage from '../assets/darkGreenPerl.png';

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
      <TitleStyled onClick={() => history.push('/')}>{title}</TitleStyled>
      <PerlLinkStyled target="_blank" href="https://youtu.be/hKBfQdKvyXc">
        <RedPerlStyled src={redPerlImage} />
      </PerlLinkStyled>
      <PerlMenuLabelStyled isNavOpen={isNavOpen}>
        <CheckboxStyled
          type="checkbox"
          onChange={() => setIsNavOpen(!isNavOpen)}
        ></CheckboxStyled>
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
}

const HeaderStyled = styled.header`
  display: grid;
  /* grid-template-columns: auto 60px; */
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
  padding-left: 16px;
  cursor: pointer;

  @media (max-width: 340px) {
    font-size: 1.75em;
  }
`;

const PerlLinkStyled = styled.a`
  position: absolute;
  top: 20px;
  left: 980px;
`;

const RedPerlStyled = styled.img``;

const CheckboxStyled = styled.input`
  display: none;
`;

const PerlMenuLabelStyled = styled.label`
  position: absolute;
  top: 20px;
  right: ${(window.innerWidth % 20 === 0 ? 20 : window.innerWidth % 20) + 'px'};
  width: 20px;
  height: 20px;
  background-image: ${(props) =>
    props.isNavOpen ? `url(${redPerlImage})` : `url(${darkGreenPerlImage})`};
  background-color: ${(props) => (props.isNavOpen ? 'red' : 'green')};

  @media (min-width: 600px) {
    right: ${(window.innerWidth % 20 === 0
      ? 40
      : (window.innerWidth % 20) + 20) + 'px'};
  }

  @media (min-width: 900px) {
    display: none;
  }
`;
