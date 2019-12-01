import React from 'react'
import styled from 'styled-components/macro'
import whitePerlsImage from '../assets/whitePerls.png'

export default function Header({ isNavOpen, setIsNavOpen }) {
  return (
    <HeaderStyled>
      <TitleStyled>Rineuto Lichtspiele</TitleStyled>
      <BurgerMenuStyled>
        <CheckboxStyled type="checkbox" onChange={() => setIsNavOpen(!isNavOpen)}></CheckboxStyled>
        <BurgerSliceStyled isNavOpen={isNavOpen} />
        <BurgerSliceStyled isNavOpen={isNavOpen} />
        <BurgerSliceStyled isNavOpen={isNavOpen} />
      </BurgerMenuStyled>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: grid;
  grid-template-columns: auto 48px;
  align-items: center;
  padding: 0 10px;
  background-image: url(${whitePerlsImage});
  background-color: white;
`

const TitleStyled = styled.h1`
  margin: 0;
`

const BurgerMenuStyled = styled.label`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 6px;
  width: 48px;
  height: 48px;
  padding: 9px 6px;
`

const CheckboxStyled = styled.input`
  display: none;
`

const BurgerSliceStyled = styled.div`
  width: 36px;
  height: 6px;
  background-color: black;
  transition: all 0.3s linear;
  transform-origin: 1px;

  :nth-child(2) {
    transform: ${props => props.isNavOpen ? 'rotate(45deg)' : 'rotate(0)'}
  }

  :nth-child(3) {
      opacity: ${props => props.isNavOpen ? '0' : '1'};
      transform: ${props => props.isNavOpen ? 'translateX(20px)' : 'translateX(0)'};
  }

  :nth-child(4) {
      transform: ${props => props.isNavOpen ? 'rotate(-45deg)' : 'rotate(0)'};
  }
`
