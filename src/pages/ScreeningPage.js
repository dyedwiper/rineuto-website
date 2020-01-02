import React from 'react'
import styled from 'styled-components/macro'
import DateRibbon from '../common/DateRibbon'

export default function ScreeningPage({ selectedScreening }) {
  return (
    <ScreeningPageStyled>
      <ScreeningInfoStyled>
        <DateRibbon date={selectedScreening.date} />
        <FilmStillStyled src={selectedScreening.imageUrl} />
        <ScreeningTitleStyled>{selectedScreening.title}</ScreeningTitleStyled>
        <FilmInfoStyled>
          {selectedScreening.country +
            ' ' +
            selectedScreening.year +
            ' | ' +
            selectedScreening.length +
            ' Min | ' +
            selectedScreening.version}
        </FilmInfoStyled>
        <FilmDirectorStyled>
          {'Regie: ' + selectedScreening.director}
        </FilmDirectorStyled>
        <FilmSynopsisStyled>{selectedScreening.synopsis}</FilmSynopsisStyled>
        <ScreeningSeriesStyled>
          Filmreihe: {selectedScreening.series}
        </ScreeningSeriesStyled>
      </ScreeningInfoStyled>
    </ScreeningPageStyled>
  )
}

const ScreeningPageStyled = styled.main`
  overflow: auto;
`

const ScreeningInfoStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  margin: 0 auto;
  max-width: 600px;
  padding: 40px 10px;
`

const FilmStillStyled = styled.img`
  width: 100%;
`

const ScreeningTitleStyled = styled.h2`
  margin: 0;
  padding: 10px;
  background-color: white;
`

const FilmInfoStyled = styled.div`
  padding: 5px 10px 0 10px;
  background-color: black;
  color: white;
`

const FilmDirectorStyled = styled.div`
  padding: 0 10px 5px 10px;
  background-color: black;
  color: white;
`

const FilmSynopsisStyled = styled.p`
  overflow: auto;
  overflow-wrap: break-word;
  margin: 0;
  padding: 10px;
  background-color: white;
`

const ScreeningSeriesStyled = styled.div`
  padding: 10px;
  background-color: black;
  color: white;
`
