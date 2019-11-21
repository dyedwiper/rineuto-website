import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './common/Header'
import FilmList from './filmList/FilmList'
import blackPerlsImage from './assets/blackPerls.png'
import FilmPage from './filmPage/FilmPage'
import { getSingleScreening } from './utils/services'

export default function App() {
  const [selectedFilm, setSelectedFilm] = useState({})

  useEffect(() => {
    const currentUrl = window.location
    if (
      currentUrl.pathname === '/film' &&
      Object.entries(selectedFilm).length === 0 &&
      selectedFilm.constructor === Object
    ) {
      const currentFilmId = currentUrl.search.slice(4)
      getSingleScreening(currentFilmId)
        .then(setSelectedFilm)
        .catch(console.error)
    }
  }, [selectedFilm])

  return (
    <Router>
      <AppStyled>
        <Header />
        <Switch>
          <Route exact path="/">
            <FilmList setSelectedFilm={setSelectedFilm} />
          </Route>
          <Route path={'/film'}>
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
