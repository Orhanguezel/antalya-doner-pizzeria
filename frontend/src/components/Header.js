import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.css';
import { useAuth } from '../context/AuthContext';  // AuthContext'ten userInfo ve logout'u çekiyoruz
import logo from '../assets/logo/11.png';

function Header() {
  const { userInfo, logout } = useAuth();  // AuthContext'ten userInfo ve logout'u çekiyoruz

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <img
                src={logo}
                alt="Antalya Döner & Pizza Logo"
                className="header-logo"
              />
              <span className="ml-2">Antalya Döner & Pizzaria <span>-Aldenhoven</span></span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto d-flex align-items-center justify-content-end">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/menu">
                <Nav.Link>Menu</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/warenkorb">
                <Nav.Link>Warenkorb</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/kontakt">
                <Nav.Link>Kontakt</Nav.Link>
              </LinkContainer>
              
              {userInfo && userInfo.role === 'admin' && (
                <LinkContainer to="/admin">
                  <Nav.Link>Panel</Nav.Link>
                </LinkContainer>
              )}

              {userInfo ? (
                <NavDropdown title={userInfo.username} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    Logout
                  </NavDropdown.Item>
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
