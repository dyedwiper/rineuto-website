import React from 'react'
import styled from 'styled-components/macro'
import DateRibbon from '../common/DateRibbon'

export default function ScreeningPage({ selectedScreening }) {
  return (
    <FilmPageStyled>
      <DateRibbon date={selectedScreening.date} />
      <FilmStillStyled src={selectedScreening.imageUrl} />
      <FilmTitleStyled>{selectedScreening.title}</FilmTitleStyled>
    </FilmPageStyled>
  )
}

const FilmPageStyled = styled.main`
  padding: 40px 10px;
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
