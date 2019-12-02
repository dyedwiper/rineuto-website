import React from 'react'
import styled from 'styled-components/macro'
import ScreeningsList from '../common/ScreeningsList'

export default function HomePage({ screenings, setSelectedScreening }) {
  return (
    <HomePageStyled>
      <SubHeadlineStyled>Unsere nächsten Filmperlen</SubHeadlineStyled>
      <ScreeningsList
        screenings={screenings
          .filter(screening => screening.date >= Date.now())
          .sort((a, b) => a.date - b.date)}
        setSelectedScreening={setSelectedScreening}
      />
    </HomePageStyled>
  )
}

const HomePageStyled = styled.main`
  overflow: auto;
`

const SubHeadlineStyled = styled.h2`
  margin: 20px 10px;
  color: white;
`
