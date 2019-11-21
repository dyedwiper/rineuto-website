import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './common/Header'
import blackPerlsImage from './assets/blackPerls.png'
import ScreeningsList from './screeningsList/ScreeningsList'
import ScreeningPage from './screeningPage/ScreeningPage'
import { getSingleScreening } from './utils/services'

export default function App() {
  const [selectedScreening, setSelectedScreening] = useState({})

  useEffect(() => {
    const currentUrl = window.location
    if (
      currentUrl.pathname === '/screening' &&
      Object.entries(selectedScreening).length === 0 &&
      selectedScreening.constructor === Object
    ) {
      const currentFilmId = currentUrl.search.slice(4)
      getSingleScreening(currentFilmId)
        .then(setSelectedScreening)
        .catch(console.error)
    }
  }, [selectedScreening])

  return (
    <Router>
      <AppStyled>
        <Header />
        <Switch>
          <Route exact path="/">
            <ScreeningsList setSelectedScreening={setSelectedScreening} />
          </Route>
          <Route path={'/screening'}>
            <ScreeningPage selectedScreening={selectedScreening} />
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
