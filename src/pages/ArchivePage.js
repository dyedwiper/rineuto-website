import React from 'react'
import styled from 'styled-components/macro'
import ScreeningsList from '../common/ScreeningsList'

export default function ArchivePage({ screenings, setSelectedScreening }) {
  return (
    <ArchivePageStyled>
      <SubHeadlineStyled>Vergangene Filmperlen</SubHeadlineStyled>
      <ScreeningsList
        screenings={screenings
          .filter(screening => screening.date < Date.now())
          .sort((a, b) => b.date - a.date)}
        setSelectedScreening={setSelectedScreening}
      />
    </ArchivePageStyled>
  )
}

const ArchivePageStyled = styled.main`
  overflow: auto;
`

const SubHeadlineStyled = styled.h2`
  margin: 20px 10px;
  text-align: center;
  color: white;
`
