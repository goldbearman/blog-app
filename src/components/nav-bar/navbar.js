import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import cn from 'classnames';
import { Button } from '@mui/material';
import classes from './nav-bar.module.scss';
import 'bootstrap/dist/css/bootstrap.css';


const logIn = () => (
  <>
    <Link to="/sing-in" className={classes.buttonNavBar}>Sign In</Link>
    <Link to="/sing-up" className={classes.buttonNavBar}>Sign Up</Link>
  </>
);

const logOut = (name, onLogin) => (
  <>
    <Link to="/sing-in" className={cn(classes.buttonNavBar, classes.buttonCreateArticle)}>Create article</Link>
    <div className={classes.userData}>
      <Link to="/profile">{name}</Link>
      <Avatar alt="Name" src="./pictures/ava.jpg" variant="circular" sx={{ width: 46, height: 46 }} />
    </div>
    <Button
      onClick={() => onLogin(false)}
      className={cn(classes.buttonNavBar, classes.buttonLogOut)}
    >
      Log Out
    </Button>
  </>
);

// eslint-disable-next-line react/prop-types
const NavBar = ({ isLoggedIn, onLogin }) => {
  // eslint-disable-next-line no-console
  console.log(isLoggedIn);

  return (
    <Navbar bg="white">
      <Container className={classes.articleNavbar}>
        <Navbar.Brand href="#home" className={classes.brand}>Realworld Blog</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn ? logOut('John Dow', onLogin) : logIn()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
