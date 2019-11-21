import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

export default function FilmPage({ selectedFilm }) {
  useEffect(() => console.log(selectedFilm))

  return (
    <FilmPageStyled>
      <FilmTitleStyled>{selectedFilm.title}</FilmTitleStyled>
      <FilmStillStyled src={selectedFilm.imageUrl} />
      <FilmDateStyled>{selectedFilm.date}</FilmDateStyled>
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
