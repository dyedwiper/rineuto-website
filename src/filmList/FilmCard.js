import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'

export default function FilmCard({ film, setSelectedFilm }) {
  let history = useHistory()

  return (
    <FilmCardStyled onClick={handleClick}>
      <FilmStillStyled src={film.imageUrl} />
      <FilmInfoStyled>
        <FilmDateStyled>{film.date}</FilmDateStyled>
        <FilmTitleStyled>{film.title}</FilmTitleStyled>
      </FilmInfoStyled>
    </FilmCardStyled>
  )

  function handleClick() {
    setSelectedFilm(film)
    history.push('/screenings/' + film._id)
  }
}

const FilmCardStyled = styled.section`
  display: grid;
  background-color: white;
`

const FilmStillStyled = styled.img`
  width: 100%;
`

const FilmInfoStyled = styled.div``

const FilmDateStyled = styled.div``

const FilmTitleStyled = styled.h2`
  margin: 0;
`
