import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './common/Header'
import blackPerlsImage from './assets/blackPerls.png'
import ScreeningsList from './screeningsList/ScreeningsList'
import ScreeningPage from './screeningPage/ScreeningPage'
import { getSingleScreening, getScreenings } from './utils/services'

export default function App() {
  const [screenings, setScreenings] = useState([])
  const [selectedScreening, setSelectedScreening] = useState({})

  useEffect(() => {
    getScreenings()
      .then(screenings => {
        const screeningsFormatted = screenings.map(screening => {
          const dateFormatted = new Date(screening.date)
          return { ...screening, date: dateFormatted }
        })
        console.log(screeningsFormatted)
        setScreenings(screeningsFormatted)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    const currentUrl = window.location
    if (
      currentUrl.pathname === '/screening' &&
      Object.entries(selectedScreening).length === 0 &&
      selectedScreening.constructor === Object
    ) {
      const currentScreeningId = currentUrl.search.slice(4)
      getSingleScreening(currentScreeningId)
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
            <ScreeningsList
              screenings={screenings}
              setSelectedScreening={setSelectedScreening}
            />
          </Route>
          <Route path="/screening">
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
