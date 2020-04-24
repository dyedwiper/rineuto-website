import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import greenPerlImage from '../assets/darkGreenPerl.png';
import redPerlImage from '../assets/redPerl.png';
import UserContext from '../userContext';
import { setToStorage } from '../utils/storage';

export default function Navigation({ isNavOpen, setIsNavOpen }) {
  const { user, setUser } = useContext(UserContext);
  const loggedIn = Object.keys(user).length !== 0;

  return (
    <NavigationStyled id="nav" isNavOpen={isNavOpen}>
      <NavLinkStyled exact to="/" onClick={() => setIsNavOpen(false)}>
        Programm
      </NavLinkStyled>
      <NavLinkStyled to="/archive" onClick={() => setIsNavOpen(false)}>
        Archiv
      </NavLinkStyled>
      <NavLinkStyled to="/about" onClick={() => setIsNavOpen(false)}>
        Über uns
      </NavLinkStyled>
      {loggedIn && (
        <>
          {/* <HorizontalLineStyled /> */}
          <NavLinkStyled to="/intern" onClick={() => setIsNavOpen(false)}>
            Intern
          </NavLinkStyled>
          <NavLinkStyled exact to="/" onClick={handleLogout}>
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
  position: ${(props) => (props.isNavOpen ? 'static' : 'absolute')};
  right: 0;
  top: 60px;
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 10px;
  height: 120px;
  padding: 10px 16px;
  background-image: url(${greenPerlImage});

  transition: all 0.3s linear;
  transform: ${(props) =>
    props.isNavOpen ? 'translateX(0)' : 'translateX(101%)'};

  @media (min-width: 900px) {
    position: static;
    grid-column-start: 1;
    display: grid;
    grid-auto-rows: min-content;
    grid-gap: 16px;
    height: auto;
    padding: 20px 16px;
    transform: translateX(0);
  }
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  text-align: right;
  color: white;
  font-size: 1.5em;
  font-weight: bold;

  @media (min-width: 900px) {
    text-align: left;
    font-size: 2em;
  }
`;

// const HorizontalLineStyled = styled.hr``;

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
