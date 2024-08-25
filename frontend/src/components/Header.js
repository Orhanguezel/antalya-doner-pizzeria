import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.css';
import logo from '../assets/web-Logo.png';

function Header({ userInfo }) {
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/auth';
  };

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <img
                src={logo}
                alt="Guezel Webdesign Logo"
                className="header-logo"
              />
              <span className="ml-2">Guezel Webdesign</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.username} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/auth">
                  <Nav.Link>Login/Register</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
