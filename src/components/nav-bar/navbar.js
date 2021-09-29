import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
// import cn from 'classnames';
import classes from './nav-bar.module.scss';
import 'bootstrap/dist/css/bootstrap.css';

const NavBar = () => (
  <Navbar bg="white">
    <Container>
      <Navbar.Brand href="#home">Realworld Blog</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <a href="sing in" className={classes.buttonNavBar}>Sign In</a>
        <a href="sing up" className={classes.buttonNavBar}>Sign Up</a>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
