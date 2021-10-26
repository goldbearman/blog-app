import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
// MATERIAL UI
import { Avatar } from '@material-ui/core';
import { Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
// REDUX UI
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import classes from './nav-bar.module.scss';


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
const NavBar = ({ counter, onLogin }) => {
  // eslint-disable-next-line no-console
  console.log(counter.isLoggedIn);

  return (
    <Navbar bg="white">
      <Container className={classes.articleNavbar}>
        <Navbar.Brand href="#home" className={classes.brand}>
          <NavLink to="/"> Realworld Blog</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {counter.isLoggedIn ? logOut('John Dow', onLogin) : logIn()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func,
  // }),
  counter: PropTypes.shape({
    arrArticles: PropTypes.arrayOf(PropTypes.object),
    isLoggedIn: PropTypes.bool,
  }),
  onLogin: PropTypes.func,
};

NavBar.defaultProps = {
  // history: {
  //   push: () => {},
  // },
  counter: {
    arrArticles: [],
    isLoggedIn: false,
  },
  onLogin: () => {},
};

const mapStateToProps = state => ({
  counter: state,
});

const mapDispathToProps = dispatch => ({
  onLogin: bool => dispatch(actions.onLogin(bool)),
});

export default connect(mapStateToProps, mapDispathToProps)(NavBar);
