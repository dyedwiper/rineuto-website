import React from 'react'
import styled from 'styled-components/macro'
import ScreeningsList from '../screeningsList/ScreeningsList'

export default function HomePage({ screenings, setSelectedScreening }) {
  return (
    <HomePageStyled>
      <ScreeningsList
        screenings={screenings
          .filter(screening => screening.date >= Date.now())
          .sort((a, b) => a.date - b.date)}
        setSelectedScreening={setSelectedScreening}
      />
    </HomePageStyled>
  )
}

const HomePageStyled = styled.main``
