import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import whitePerlsImage from '../assets/whitePerls.png'

export default function Navigation({ isNavOpen, setIsNavOpen }) {
  return (
    <NavigationStyled isNavOpen={isNavOpen}>
      <NavLinkStyled exact to="/" onClick={() => setIsNavOpen(false)}>
        Programm
      </NavLinkStyled>
      <NavLinkStyled to="/archive" onClick={() => setIsNavOpen(false)}>
        Archiv
      </NavLinkStyled>
      <NavLinkStyled to="/about" onClick={() => setIsNavOpen(false)}>
        Über uns
      </NavLinkStyled>
    </NavigationStyled>
  )
}

const NavigationStyled = styled.nav`
  position: absolute;
  right: 0;
  top: 48px;
  display: ${props => (props.isNavOpen ? 'grid' : 'none')};
  grid-gap: 10px;
  padding: 10px 16px;
  background-image: url(${whitePerlsImage});

  @media (min-width: 900px) {
    position: static;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 5px;
  }
`

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  text-align: right;
  color: black;
  font-size: 1.5em;
  font-weight: bold;

  @media (min-width: 900px) {
    text-align: left;
  }
`
