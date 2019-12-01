import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import DateRibbon from '../common/DateRibbon'

export default function ScreeningCard({ screening, setSelectedScreening }) {
  let history = useHistory()

  return (
    <ScreeningCardStyled onClick={handleClick}>
      <DateRibbon date={screening.date} />
      <FilmStillStyled src={screening.imageUrl} />
      <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
    </ScreeningCardStyled>
  )

  function handleClick() {
    setSelectedScreening(screening)
    history.push('/screening?id=' + screening._id)
  }
}

const ScreeningCardStyled = styled.section`
  display: grid;
`

const FilmStillStyled = styled.img`
  width: 100%;
`

const ScreeningTitleStyled = styled.h2`
  margin: 0;
  background-color: white;
  padding: 10px;
`
