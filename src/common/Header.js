import React from 'react'
import styled from 'styled-components/macro'
import whitePerlsImage from '../assets/whitePerls.png'

export default function Header() {
  return (
    <HeaderStyled>
      <TitleStyled>Rineuto Lichtspiele</TitleStyled>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: grid;
  align-items: center;
  padding: 0 10px;
  background-image: url(${whitePerlsImage});
  background-color: white;
`

const TitleStyled = styled.h1`
  margin: 0;
`
