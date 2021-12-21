import React from 'react';
// REACT ROUTER DOM
import { Route, Redirect } from 'react-router-dom';
// OTHER LIBRARIES
import PropTypes from 'prop-types';


const PrivateRoute = ({
  component: Component, auth, redirect, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem('user')
        ? (
          <>
            <Component {...props} />
          < />
        )
        : (
          <>
            <Redirect to={redirect} />
          < />
        )
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  auth: PropTypes.bool,
  redirect: PropTypes.string,
};

PrivateRoute.defaultProps = {
  component: {},
  auth: false,
  redirect: '',
};

export default PrivateRoute;
