import React from 'react'
import styled from 'styled-components/macro'

export default function Header() {
  return (
    <HeaderStyled>
      <TitleStyled>Rineuto Lichtspiele</TitleStyled>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  background-color: white;
`

const TitleStyled = styled.h1`
  margin: 0;
`
