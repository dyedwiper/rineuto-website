import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

export default function ScreeningPage({ selectedScreening }) {
  useEffect(() => console.log(selectedScreening))

  return (
    <FilmPageStyled>
      <FilmTitleStyled>{selectedScreening.title}</FilmTitleStyled>
      <FilmStillStyled src={selectedScreening.imageUrl} />
      <FilmDateStyled>{selectedScreening.date}</FilmDateStyled>
    </FilmPageStyled>
  )
}

const FilmPageStyled = styled.main`
  padding: 10px;
`

const FilmTitleStyled = styled.h2`
  color: white;
`

const FilmStillStyled = styled.img`
  width: 100%;
`

const FilmDateStyled = styled.span`
  color: white;
`
