import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';
import whitePerlImage from '../assets/whitePerl.png';

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
      <BurgerMenuStyled>
        <CheckboxStyled
          type="checkbox"
          onChange={() => setIsNavOpen(!isNavOpen)}
        ></CheckboxStyled>
        <BurgerSliceStyled isNavOpen={isNavOpen} />
        <BurgerSliceStyled isNavOpen={isNavOpen} />
        <BurgerSliceStyled isNavOpen={isNavOpen} />
      </BurgerMenuStyled>
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
  grid-template-columns: auto 48px;
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
`;

const BurgerMenuStyled = styled.label`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 6px;
  width: 48px;
  height: 48px;
  padding: 9px 6px;

  @media (min-width: 900px) {
    display: none;
  }
`;

const CheckboxStyled = styled.input`
  display: none;
`;

const BurgerSliceStyled = styled.div`
  width: 36px;
  height: 6px;
  background-color: black;
  transition: all 0.3s linear;
  transform-origin: 1px;

  :nth-child(2) {
    transform: ${(props) => (props.isNavOpen ? 'rotate(45deg)' : 'rotate(0)')};
  }

  :nth-child(3) {
    opacity: ${(props) => (props.isNavOpen ? '0' : '1')};
    transform: ${(props) =>
      props.isNavOpen ? 'translateX(20px)' : 'translateX(0)'};
  }

  :nth-child(4) {
    transform: ${(props) => (props.isNavOpen ? 'rotate(-45deg)' : 'rotate(0)')};
  }
`;
