import React from 'react'
import styled from 'styled-components/macro'

export default function FilmCard({ film }) {
  return (
    <FilmCardStyled>
      <FilmStillStyled src={film.imageUrl} />
      <FilmInfoStyled>
        <FilmTitleStyled>{film.title}</FilmTitleStyled>
        <FilmDateStyled>{film.playDate}</FilmDateStyled>
      </FilmInfoStyled>
    </FilmCardStyled>
  )
}

const FilmCardStyled = styled.section`
  display: grid;
  background-color: white;
`

const FilmStillStyled = styled.img`
  width: 100%;
`

const FilmInfoStyled = styled.div`
  display: grid;
  grid-auto-columns: min-content;
`

const FilmDateStyled = styled.div``

const FilmTitleStyled = styled.h2`
  margin: 0;
`
