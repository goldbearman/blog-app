import React from 'react';
// OTHER LIBRARIES
import cn from 'classnames';
// REACT BOOTSTRAP
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
// REACT ROUTER DOM
import {
  Link, NavLink, useHistory,
} from 'react-router-dom';
// MATERIAL UI
import { Avatar } from '@material-ui/core';
import { Button } from '@mui/material';
// REDUX UI
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
// ICON
import defaultImg from '../../pictures/smiley-cyrus.jpeg';

import classes from './nav-bar.module.scss';

const logOut = (buttonActive, dispatch) => (
  <>
    <Link
      to="/sing-in"
      onClick={() => dispatch(actions.onButtonActive('in'))}
      className={cn(classes.buttonNavBar, { [classes.buttonActive]: buttonActive === 'in' })}
    >
      Sign In
    </Link>
    <Link
      to="/sing-up"
      onClick={() => dispatch(actions.onButtonActive('up'))}
      className={cn(classes.buttonNavBar, { [classes.buttonActive]: buttonActive === 'up' })}
    >
      Sign Up
    </Link>
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

const NavBar = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state);
  const history = useHistory();

  const onLogin = (bool) => {
    localStorage.removeItem('user');
    dispatch(actions.onLogin(bool));
    history.push('/articles');
  };

  return (
    <Navbar bg="white">
      <Container className={classes.articleNavbar}>
        <Navbar.Brand href="#home" className={classes.brand}>
          <NavLink id="RouterNavLink" to="/" onClick={() => dispatch(actions.onButtonActive(''))}> Realworld Blog</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {counter.isLoggedIn
            ? logIn(counter.user, onLogin)
            : logOut(counter.buttonActive, dispatch)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
