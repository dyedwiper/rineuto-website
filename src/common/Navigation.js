import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import whitePerlsImage from '../assets/whitePerls.png'

export default function Navigation({ isNavOpen }) {
  return (
    <NavigationStyled isNavOpen={isNavOpen}>
      <NavLinkStyled exact to="/">
        Home
      </NavLinkStyled>
      <NavLinkStyled to="/about">Über uns</NavLinkStyled>
    </NavigationStyled>
  )
}

const NavigationStyled = styled.nav`
  display: ${props => props.isNavOpen ? 'grid' : 'none'};
  grid-gap: 10px;
  padding: 10px;
  background-image: url(${whitePerlsImage});
`

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: 1.5em;
  font-weight: bold;
`