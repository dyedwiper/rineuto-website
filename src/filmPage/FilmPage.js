import React from 'react'
import styled from 'styled-components/macro'

export default function FilmPage({ selectedFilm }) {
  return (
    <FilmPageStyled>
      <FilmTitleStyled>{selectedFilm.title}</FilmTitleStyled>
      <FilmStillStyled src={selectedFilm.imageUrl} />
    </FilmPageStyled>
  )
}

const FilmPageStyled = styled.main``

const FilmTitleStyled = styled.h2``

const FilmStillStyled = styled.img`
  width: 100%;
`
