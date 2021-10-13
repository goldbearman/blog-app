import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import cn from 'classnames';
import classes from './nav-bar.module.scss';
import 'bootstrap/dist/css/bootstrap.css';


const logIn = () => (
  <>
    <Link to="/sing-in" className={classes.buttonNavBar}>Sign In</Link>
    <Link to="/sing-up" className={classes.buttonNavBar}>Sign Up</Link>
  </>
);

const logOut = name => (
  <>
    <Link to="/sing-in" className={cn(classes.buttonNavBar, classes.buttonCreateArticle)}>Create article</Link>
    <div className={classes.userData}>
      <Link to="/profile">{name}</Link>
      <Avatar alt="Name" src="./pictures/ava.jpg" variant="circular" sx={{ width: 46, height: 46 }} />
    </div>
    <Link to="/sing-up" className={cn(classes.buttonNavBar, classes.buttonLogOut)}>Log Out</Link>
  </>
);

// eslint-disable-next-line react/prop-types
const NavBar = ({ isLoggedIn }) => {
  // eslint-disable-next-line no-console
  console.log(isLoggedIn);

  return (
    <Navbar bg="white">
      <Container className={classes.articleNavbar}>
        <Navbar.Brand href="#home" className={classes.brand}>Realworld Blog</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn ? logIn() : logOut('John Dow')}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
