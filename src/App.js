import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './common/Header'
import FilmList from './filmList/FilmList'
import blackPerlsImage from './assets/blackPerls.png'
import FilmPage from './filmPage/FilmPage'

export default function App() {
  const [selectedFilm, setSelectedFilm] = useState({})

  return (
    <Router>
      <AppStyled>
        <Header />
        <Switch>
          <Route exact path="/">
            <FilmList setSelectedFilm={setSelectedFilm} />
          </Route>
          <Route path={'/screenings/' + selectedFilm._id}>
            <FilmPage selectedFilm={selectedFilm} />
          </Route>
        </Switch>
      </AppStyled>
    </Router>
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
  background-image: url(${blackPerlsImage});
  background-color: black;
`
