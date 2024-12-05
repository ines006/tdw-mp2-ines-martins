import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.nav`
  background-color: #003366;
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  color: white;
  margin: 0;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
`;

const NavItem = styled(Link)`
  color: #ecf0f1;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: #f8f8f8; 
    font-weight: semibold; 
    text-decoration: underline;

  }

  &.active {
    color: white;
    font-weight: bold; 
  }
`;

const Navbar = () => {

  const location = useLocation(); // Obtém o local atual

  return (
    <NavBar>
      <Title>Pet App</Title> 
      <NavList>
        <li>
          <NavItem to="/home" className={location.pathname === '/home' ? 'active' : ''}>
            Home
          </NavItem>
        </li>
        <li>
          <NavItem to="/favorite" className={location.pathname === '/favorite' ? 'active' : ''}>
            Favorites
          </NavItem>
        </li>
        <li>
          <NavItem to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About
          </NavItem>
        </li>
      </NavList>
    </NavBar>
  );
};

export default Navbar;
