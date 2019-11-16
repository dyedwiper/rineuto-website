import React from 'react'
import styled from 'styled-components/macro'
import filmData from '../mockData.json'
import FilmCard from './FilmCard.js'

export default function FilmList() {
  return (
    <FilmListStyled>
      <SubHeadlineStyled>Unsere nächsten Filmperlen</SubHeadlineStyled>
      {filmData.map(film => (
        <FilmCard film={film} key={film.title} />
      ))}
      <Cushion />
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

const SubHeadlineStyled = styled.h2`
  margin: 0;
  color: white;
`

const Cushion = styled.div`
  height: 30px;
`
