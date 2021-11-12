import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, NavLink, useHistory } from 'react-router-dom';
import cn from 'classnames';
// MATERIAL UI
import { Avatar } from '@material-ui/core';
import { Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
// REDUX UI
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import classes from './nav-bar.module.scss';

import defaultImg from '../../pictures/avatar.png';


const logOut = () => (
  <>
    <Link to="/sing-in" className={classes.buttonNavBar}>Sign In</Link>
    <Link to="/sing-up" className={classes.buttonNavBar}>Sign Up</Link>
  </>
);

const logIn = (user, onLogin) => (
  <>
    <Link to="/new-article" className={cn(classes.buttonNavBar, classes.buttonCreateArticle)}>Create article</Link>
    <div className={classes.userData}>
      <Link to="/profile">{user.username}</Link>
      <Avatar alt="Name" src={user.imgage || defaultImg} variant="circular" sx={{ width: 46, height: 46 }} />
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
const NavBar = () => {
  // eslint-disable-next-line no-console
  const dispatch = useDispatch();
  const counter = useSelector(state => state);
  const history = useHistory();

  const onLogin = (bool) => {
    localStorage.removeItem('token');
    dispatch(actions.onLogin(bool));
    history.push('/articles');
  };

  return (
    <Navbar bg="white">
      <Container className={classes.articleNavbar}>
        <Navbar.Brand href="#home" className={classes.brand}>
          <NavLink to="/"> Realworld Blog</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {counter.isLoggedIn ? logIn(counter.user, onLogin) : logOut()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
