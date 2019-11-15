import React from 'react'
import styled from 'styled-components/macro'
import filmData from '../mockData.json'
import FilmCard from './FilmCard.js'

export default function FilmList() {
  return (
    <FilmListStyled>
      {filmData.map(film => (
        <FilmCard film={film} key={film.title} />
      ))}
    </FilmListStyled>
  )
}

const FilmListStyled = styled.main`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 10px;
  overflow: auto;
  padding: 10px;
`
