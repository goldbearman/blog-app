import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
// import { Container } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Alert } from '@mui/material';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './form.module.scss';
import { FormContainer } from './formContainer';
import { BlogContext } from '../app/blog-context';


const SignInSchema = yup.object().shape({
  'User name': yup.string().min(3).max(20).required(),
  'Email address': yup.string().email().required(),
  Password: yup.string().min(6).max(40).required('Поле обязательно!'),
  // eslint-disable-next-line no-undef
  'Confirm password': yup.string().oneOf([yup.ref('Password')], 'Passwords should match'),
});


// eslint-disable-next-line react/prop-types
function SingUpForm({ history }) {
  const value = useContext(BlogContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
    mode: 'all',
  });

  // eslint-disable-next-line no-console
  console.log(history);

  const alertText = (data) => {
    // eslint-disable-next-line no-console
    console.log('alert');
    // eslint-disable-next-line no-param-reassign,no-unused-vars
    data = {};
    return (
      <Alert severity="error">This is an error alert — check it out!</Alert>
    );
  };

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);

    // eslint-disable-next-line no-param-reassign
    data = { username: data['User name'], email: data['Email address'], password: data.Password };
    // eslint-disable-next-line no-console
    console.log(data);
    // eslint-disable-next-line no-console
    value.blogService.registration(data).then((responseBody) => {
      // eslint-disable-next-line no-console
      console.log(responseBody);
      history.push('/sing-in');
      localStorage.setItem('user', responseBody.user);
    }, alertText(data));
  };

  // eslint-disable-next-line no-unused-vars
  const checkAgree = watch('checkAgree');

  // eslint-disable-next-line no-console
  console.log(checkAgree);
  // eslint-disable-next-line no-console
  console.log(errors);
  // eslint-disable-next-line no-console
  console.log((Object.keys(errors).length === 0));
  // eslint-disable-next-line no-console
  console.log(!(checkAgree && (Object.keys(errors).length === 0)));

  return (
    <FormContainer>
      <h1>Create new account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          UserName
          <input
            className={cn(errors?.['User name'] && classes.error)}
            type="text"
            placeholder="Username"
            {...register('User name')}
          />
        </label>
        <p>{errors?.['User name'] && errors?.['User name']?.message}</p>
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
        <label>
          Repeat Password
          <input
            className={cn(errors?.['Confirm password'] && classes.error)}
            type="password"
            placeholder="Password"
            {...register('Confirm password')}
          />
        </label>
        <p>{errors?.['Confirm password'] && errors?.['Confirm password']?.message}</p>

        <hr size={3} />

        <FormControlLabel
          className={classes.labelControl}
          control={
            <Checkbox className={classes.checkboxControl} {...register('checkAgree')} color="primary" />
          }
          label="I agree to the processing of my personal
         information"
        />
        <input className={classes.submitButton} value="Create" type="submit" disabled={!checkAgree} />
        <div className={classes.formFooter}>
          Already have an account?
          <Link to="/sing-in" className={classes.buttonNavBar}>Sign In</Link>
        </div>
      </form>
    </FormContainer>
  );
}

export default SingUpForm;

SingUpForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

SingUpForm.defaultProps = {
  history: {
    push: () => {},
  },
};
