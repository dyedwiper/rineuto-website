import React from 'react'
import styled from 'styled-components/macro'
import ScreeningCard from './ScreeningCard.js'

export default function ScreeningsList({ screenings, setSelectedScreening }) {
  return (
    <ScreeningsListStyled>
      {screenings.map(screening => (
        <ScreeningCard
          screening={screening}
          key={screening.title}
          setSelectedScreening={setSelectedScreening}
        />
      ))}
      <Cushion />
    </ScreeningsListStyled>
  )
}

const ScreeningsListStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 50px;
  overflow: auto;
  padding: 30px 10px;
`

const Cushion = styled.div`
  height: 30px;
`
