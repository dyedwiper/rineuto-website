import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import greenPerlImage from '../assets/perls/darkGreenPerl.png';
import redPerlImage from '../assets/perls/redPerl.png';
import UserContext from '../userContext';
import { setToStorage } from '../utils/storage';

export default function Navigation({ isNavOpen, setIsNavOpen }) {
  const { user, setUser } = useContext(UserContext);
  const loggedIn = Object.keys(user).length !== 0;

  return (
    <NavigationStyled loggedIn={loggedIn} isNavOpen={isNavOpen}>
      <NavLinkStyled exact to="/" onClick={() => setIsNavOpen(false)}>
        Home
      </NavLinkStyled>
      <NavLinkStyled to="/program" onClick={() => setIsNavOpen(false)}>
        Programm
      </NavLinkStyled>
      <NavLinkStyled to="/archive" onClick={() => setIsNavOpen(false)}>
        Archiv
      </NavLinkStyled>
      <NavLinkStyled to="/posters" onClick={() => setIsNavOpen(false)}>
        Plakate
      </NavLinkStyled>
      <NavLinkStyled to="/about" onClick={() => setIsNavOpen(false)}>
        Über uns
      </NavLinkStyled>
      <NavLinkStyled to="/imprint" onClick={() => setIsNavOpen(false)}>
        Impressum
      </NavLinkStyled>
      {loggedIn && (
        <>
          <HorizontalLineStyled />
          <NavLinkStyled
            to="/intern/addScreening"
            onClick={() => setIsNavOpen(false)}
          >
            Neuer Film
          </NavLinkStyled>
          <NavLinkStyled exact to="/logout" onClick={handleLogout}>
            Logout
          </NavLinkStyled>
        </>
      )}
      <PerlLinkStyled target="_blank" href="https://youtu.be/hKBfQdKvyXc">
        <RedPerlStyled src={redPerlImage} />
      </PerlLinkStyled>
    </NavigationStyled>
  );

  function handleLogout() {
    setToStorage('rineuto-token', null);
    setUser({});
    setIsNavOpen(false);
  }
}

const NavigationStyled = styled.nav`
  position: absolute;
  right: 0;
  top: 60px;
  z-index: 1000;
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-image: url(${greenPerlImage});
  filter: ${(props) => (props.isNavOpen ? 'none' : 'blur(4px)')};
  transform: ${(props) =>
    props.isNavOpen ? 'translateX(0)' : 'translateX(101%)'};
  transition: all 2.3s linear;

  @media (min-width: 900px) {
    position: static;
    grid-column-start: 1;
    display: grid;
    grid-auto-rows: min-content;
    grid-gap: 16px;
    height: auto;
    padding: 20px 20px;
    filter: none;
    transform: translateX(0);
  }
`;

const NavLinkStyled = styled(NavLink)`
  justify-self: right;
  width: max-content;
  text-decoration: none;
  color: white;
  font-size: 1.5em;
  font-weight: bold;

  :hover {
    text-decoration: underline;
  }

  &.active {
    transform: skew(0deg, -13deg);
  }

  @media (min-width: 900px) {
    justify-self: left;
    font-size: 2em;
  }
`;

const HorizontalLineStyled = styled.hr`
  visibility: hidden;
`;

const PerlLinkStyled = styled.a`
  position: absolute;
  left: 20px;
  bottom: 20px;
  height: 20px;

  @media (min-width: 900px) {
    display: none;
  }
`;

const RedPerlStyled = styled.img``;
