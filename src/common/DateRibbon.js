import React from 'react'
import styled from 'styled-components/macro'

export default function DateRibbon({ date }) {
  return (
    <DateRibbonStyled>
      <WeekdayStyled>
        {date.toLocaleDateString('de-DE', {
          weekday: 'short'
        })}
      </WeekdayStyled>
      <DayStyled>
        {date.toLocaleDateString('de-DE', {
          day: '2-digit'
        })}
      </DayStyled>
      <MonthStyled>
        {date.toLocaleDateString('de-DE', {
          month: '2-digit'
        })}
      </MonthStyled>
      <YearStyled>
        {date.toLocaleDateString('de-DE', {
          year: '2-digit'
        })}
      </YearStyled>
    </DateRibbonStyled>
  )
}

const DateRibbonStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(20px, 4);
  grid-template-areas:
    'weekday day day year'
    'weekday month month year';
`

const WeekdayStyled = styled.div`
  grid-area: weekday;
  background-color: black;
  color: white;
  writing-mode: sideways-lr;
  text-orientation: mixed;
`

const DayStyled = styled.div`
  grid-area: day;
  background-color: white;
`

const MonthStyled = styled.div`
  grid-area: month;
  background-color: white;
`

const YearStyled = styled.div`
  grid-area: year;
  background-color: black;
  color: white;
`
