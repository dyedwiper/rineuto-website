import React from 'react'
import styled from 'styled-components/macro'

export default function ScreeningPage({ selectedScreening }) {
  return (
    <FilmPageStyled>
      <FilmTitleStyled>{selectedScreening.title}</FilmTitleStyled>
      <FilmStillStyled src={selectedScreening.imageUrl} />
      <FilmDateStyled>
        {selectedScreening.date.toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </FilmDateStyled>
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
