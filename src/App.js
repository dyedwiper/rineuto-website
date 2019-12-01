import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import blackPerlsImage from './assets/blackPerls.png'
import Header from './common/Header'
import ScreeningPage from './screeningPage/ScreeningPage'
import ScreeningsList from './screeningsList/ScreeningsList'
import { getScreenings } from './utils/services'
import AboutPage from './pages/AboutPage'

export default function App() {
  const [screenings, setScreenings] = useState([])
  const [selectedScreening, setSelectedScreening] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    getScreenings()
      .then(screenings => {
        const screeningsFormatted = screenings.map(screening => {
          const dateFormatted = new Date(screening.date)
          return { ...screening, date: dateFormatted }
        })
        setScreenings(screeningsFormatted)
        setIsLoading(false)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    const currentUrl = window.location
    if (
      !isLoading &&
      currentUrl.pathname === '/screening' &&
      Object.entries(selectedScreening).length === 0 &&
      selectedScreening.constructor === Object
    ) {
      const currentScreeningId = currentUrl.search.slice(4)
      const currentScreening = screenings.find(
        screening => screening._id === currentScreeningId
      )
      setSelectedScreening(currentScreening)
    }
  }, [isLoading, screenings, selectedScreening])

  return (
    <Router>
      <AppStyled>
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Switch>
          <Route exact path="/">
            <ScreeningsList
              screenings={screenings}
              setSelectedScreening={setSelectedScreening}
            />
          </Route>
          <Route path="/screening">
            {Object.entries(selectedScreening).length && (
              <ScreeningPage selectedScreening={selectedScreening} />
            )}
          </Route>
          <Route path="/about">
            <AboutPage />
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
