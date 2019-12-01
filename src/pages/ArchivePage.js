import React from 'react'
import styled from 'styled-components/macro'
import ScreeningsList from '../screeningsList/ScreeningsList'

export default function ArchivePage({ screenings, setSelectedScreening }) {
  return (
    <ArchivePageStyled>
      <ScreeningsList
        screenings={screenings
          .filter(screening => screening.date < Date.now())
          .sort((a, b) => b.date - a.date)}
        setSelectedScreening={setSelectedScreening}
      />
    </ArchivePageStyled>
  )
}

const ArchivePageStyled = styled.main``
