import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import FilmCard from './FilmCard.js'
import { getScreenings } from '../utils/services.js'

export default function FilmList({ setSelectedFilm }) {
  const [screenings, setScreenings] = useState([])

  useEffect(() => {
    getScreenings()
      .then(setScreenings)
      .catch(console.error)
  }, [])

  return (
    <FilmListStyled>
      <SubHeadlineStyled>Unsere nächsten Filmperlen</SubHeadlineStyled>
      {screenings.map(film => (
        <FilmCard
          film={film}
          key={film.title}
          setSelectedFilm={setSelectedFilm}
        />
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
