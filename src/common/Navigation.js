import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import whitePerlsImage from '../assets/whitePerls.png'

export default function Navigation({ isNavOpen, setIsNavOpen }) {
  return (
    <NavigationStyled isNavOpen={isNavOpen}>
      <NavLinkStyled exact to="/" onClick={() => setIsNavOpen(false)}>
        Home
      </NavLinkStyled>
      <NavLinkStyled to="/about" onClick={() => setIsNavOpen(false)}>Über uns</NavLinkStyled>
    </NavigationStyled>
  )
}

const NavigationStyled = styled.nav`
  display: ${props => props.isNavOpen ? 'grid' : 'none'};
  grid-gap: 10px;
  padding: 10px 16px;
  background-image: url(${whitePerlsImage});
`

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  text-align: right;
  color: black;
  font-size: 1.5em;
  font-weight: bold;
`