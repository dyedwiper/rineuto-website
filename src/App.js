import React from 'react'
import styled from 'styled-components/macro'
import Header from './common/Header'
import FilmList from './filmList/FilmList'

export default function App() {
  return (
    <AppStyled>
      <Header />
      <FilmList />
    </AppStyled>
  )
}

const AppStyled = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  height: 100%;

  display: grid;
  grid-template-rows: 48px auto;
  background-color: black;
`
