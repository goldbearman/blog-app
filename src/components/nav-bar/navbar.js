import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import cn from 'classnames';
import classes from './nav-bar.module.scss';
import 'bootstrap/dist/css/bootstrap.css';

const NavBar = () => (
  <Navbar bg="white">
    <Container className={classes.articleNavbar}>
      <Navbar.Brand href="#home" className={classes.brand}>Realworld Blog</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Link to="/sing-in" className={classes.buttonNavBar}>Sign In</Link>
        <Link to="/sing-up" className={classes.buttonNavBar}>Sign Up</Link>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
