import React from 'react'
import styled from 'styled-components/macro'

export default function DateRibbon({ date }) {
  return (
    <DateRibbonStyled>
      <DateStyled>
        {date.toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit'
        })}
      </DateStyled>
      <TimeStyled>
        {date.toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </TimeStyled>
    </DateRibbonStyled>
  )
}

const DateRibbonStyled = styled.div`
  transform: skew(0deg, -13deg);
  width: min-content;
  font-size: 1.5em;
  font-weight: bold;
`

const DateStyled = styled.span`
  padding: 5px 10px;
  background-color: white;
`

const TimeStyled = styled.span`
  padding: 5px 10px;
  background-color: black;
  color: white;
`
