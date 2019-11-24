import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'

export default function ScreeningCard({ screening, setSelectedScreening }) {
  let history = useHistory()

  return (
    <ScreeningCardStyled onClick={handleClick}>
      <ScreeningStillStyled src={screening.imageUrl} />
      <ScreeningInfoStyled>
        <ScreeningDateStyled>
          {screening.date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </ScreeningDateStyled>
        <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
      </ScreeningInfoStyled>
    </ScreeningCardStyled>
  )

  function handleClick() {
    setSelectedScreening(screening)
    history.push('/screening?id=' + screening._id)
  }
}

const ScreeningCardStyled = styled.section`
  display: grid;
  background-color: white;
`

const ScreeningStillStyled = styled.img`
  width: 100%;
`

const ScreeningInfoStyled = styled.div``

const ScreeningDateStyled = styled.div``

const ScreeningTitleStyled = styled.h2`
  margin: 0;
`
