import React from 'react';
// OTHER LIBRARIES
import cn from 'classnames';
import PropTypes from 'prop-types';
// REACT HOOK FORM
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// REACT ROUTER DOM
import { Link, useHistory } from 'react-router-dom';
// REDUX
import { connect, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { fetchAuthentication } from '../../redux/asyncAction';
// CUSTOM COMPONENTS
import { FormContainer } from './formContainer';

import classes from './form.module.scss';

const SignInSchema = yup.object().shape({
  'Email address': yup.string().email().required(),
  Password: yup.string().min(6).max(40).required('Поле обязательно!'),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
    mode: 'all',
  });
  const onSubmit = (data) => {
    let result = { ...data };
    result = { email: data['Email address'], password: data.Password };
    dispatch(fetchAuthentication(result, history));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email address">
          Email address
          <input
            id="email address"
            className={cn(errors?.['Email address'] && classes.error)}
            type="text"
            placeholder="Email address"
            {...register('Email address')}
          />
        </label>
        <p>{errors?.['Email address'] && errors?.['Email address']?.message}</p>
        <label htmlFor="password">
          Password
          <input
            id="password"
            className={cn(errors?.Password && classes.error)}
            type="password"
            placeholder="Password"
            {...register('Password')}
          />
        </label>
        <p>{errors?.Password && errors?.Password?.message}</p>
        {/* <p>{(signInError && !errors?.Password) && 'Введен неверный логин или пароль'}</p> */}

        <input className={classes.submitButtonSingIn} value="Login" type="submit" />
        <div className={classes.formFooter}>
          Don’t have an account?
          <Link to="/sing-up" className={classes.buttonNavBar}>Sign Up</Link>
        </div>
      </form>
    </FormContainer>
  );
};

SignInForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  onLogin: PropTypes.func,
};

SignInForm.defaultProps = {
  history: {
    push: () => {
    },
  },
  onLogin: () => {
  },
};

const mapStateToProps = state => ({
  counter: state,
});

const mapDispathToProps = dispatch => ({
  onLogin: bool => dispatch(actions.onLogin(bool)),
});

export default connect(mapStateToProps, mapDispathToProps)(SignInForm);
