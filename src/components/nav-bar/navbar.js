import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';

const NavBar = () => (
  <Navbar bg="white">
    <Container>
      <Navbar.Brand href="#home">Realworld Blog</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Button />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
