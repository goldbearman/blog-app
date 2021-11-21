import React from 'react';
// OTHER LIBRARIES
import cn from 'classnames';
// REACT HOOK FORM
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// MATERIAL UI
import { Checkbox, FormControlLabel } from '@material-ui/core';
// REACT ROUTER DOM
import { Link, useHistory } from 'react-router-dom';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegistration } from '../../redux/asyncAction';
// CUSTOM COMPONENTS
import { FormContainer } from './formContainer';

import classes from './form.module.scss';

const SignInSchema = yup.object().shape({
  'User name': yup.string().min(3).max(20).required(),
  'Email address': yup.string().email().required(),
  Password: yup.string().min(6).max(40).required('Поле обязательно!'),
  // eslint-disable-next-line no-undef
  'Confirm password': yup.string().oneOf([yup.ref('Password')], 'Passwords should match'),
});


function SingUpForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const errorRegistration = useSelector(state => state.errorRegistration);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
    mode: 'all',
  });

  console.log(errorRegistration);

  const onSubmit = (data) => {
    let result = { ...data };
    result = { username: data['User name'], email: data['Email address'], password: data.Password };
    dispatch(fetchRegistration(result, history));
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
        <label htmlFor="user name">
          UserName
          <input
            id="user name"
            className={cn(errors?.['User name'] && classes.error)}
            type="text"
            placeholder="Username"
            {...register('User name')}
          />
        </label>
        <p>{errors?.['User name'] && errors?.['User name']?.message}</p>
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
        <label htmlFor="repeat password">
          Repeat Password
          <input
            id="repeat password"
            className={cn(errors?.['Confirm password'] && classes.error)}
            type="password"
            placeholder="Password"
            {...register('Confirm password')}
          />
        </label>
        <p>{errors?.['Confirm password'] && errors?.['Confirm password']?.message}</p>
        <p>{errorRegistration && 'Invalid email or password'}</p>

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
