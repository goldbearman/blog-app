import React, { useContext } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './form.module.scss';
import { FormContainer } from './formContainer';
import { BlogContext } from '../app/blog-context';

const SignInSchema = yup.object().shape({
  'Email address': yup.string().email().required(),
  Password: yup.string().min(6).max(40).required('Поле обязательно!'),
});

const SignInForm = ({ history, onLogin }) => {
  const value = useContext(BlogContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
    mode: 'all',
  });
  const onSubmit = (data) => {
    // eslint-disable-next-line no-param-reassign
    data = { email: data['Email address'], password: data.Password };
    // eslint-disable-next-line no-console
    console.log(data);
    alert(JSON.stringify(data));
    value.blogService.authentication(data).then((responseBody) => {
      // eslint-disable-next-line no-console
      console.log(responseBody);
      onLogin();
      history.push('/articles');
      // localStorage.setItem('user', responseBody.user);
      // eslint-disable-next-line no-console
    }, error => console.log(error));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Email address
          <input
            className={cn(errors?.['Email address'] && classes.error)}
            type="text"
            placeholder="Email address"
            {...register('Email address')}
          />
        </label>
        <p>{errors?.['Email address'] && errors?.['Email address']?.message}</p>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Password
          <input
            className={cn(errors?.Password && classes.error)}
            type="password"
            placeholder="Password"
            {...register('Password')}
          />
        </label>
        <p>{errors?.Password && errors?.Password?.message}</p>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}

        <input className={classes.submitButtonSingIn} value="Login" type="submit" />
        <div className={classes.formFooter}>
          Don’t have an account?
          <Link to="/sing-up" className={classes.buttonNavBar}>Sign Up</Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default SignInForm;

SignInForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  onLogin: PropTypes.func,
};

SignInForm.defaultProps = {
  history: {
    push: () => {},
  },
  onLogin: () => {},
};
