import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './form.module.scss';
import { FormContainer } from './formContainer';
import { fetchRegistration } from '../../redux/asyncAction';
import { onErrorRegistration } from '../../redux/actions';


const SignInSchema = yup.object().shape({
  'User name': yup.string().min(3).max(20).required(),
  'Email address': yup.string().email().required(),
  Password: yup.string().min(6).max(40).required('Поле обязательно!'),
  // eslint-disable-next-line no-undef
  'Confirm password': yup.string().oneOf([yup.ref('Password')], 'Passwords should match'),
});


// eslint-disable-next-line react/prop-types
function SingUpForm({
  history, signUp, counter: { errorRegistration }, isRegistration,
}) {
  // const value = useContext(BlogContext);
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
  console.log(errorRegistration);

  const onSubmit = (data) => {
    // eslint-disable-next-line no-param-reassign
    data = { username: data['User name'], email: data['Email address'], password: data.Password };
    // eslint-disable-next-line no-console
    console.log(data);
    signUp(data, history);
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

  useEffect(() => {
    const timeOut = setTimeout(() => isRegistration(false), 2000);
    return () => clearTimeout(timeOut);
  }, []);

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
        <p className={classes.errorRegistration}>{(Object.keys(errors).length === 0 && errorRegistration) && 'Invalid email or password'}</p>

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

SingUpForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  onErrorRegistration: PropTypes.func,
  signUp: PropTypes.bool,
  counter: PropTypes.shape({ errorRegistration: PropTypes.bool }),
  isRegistration: PropTypes.bool,
};

SingUpForm.defaultProps = {
  history: {
    push: () => {},
  },
  onErrorRegistration: () => {},
  signUp: false,
  counter: PropTypes.shape({ errorRegistration: false }),
  isRegistration: false,
};

const mapDispathToProps = dispatch => ({
  signUp: (data, history) => dispatch(fetchRegistration(data, history)),
  isRegistration: bool => dispatch(onErrorRegistration(bool)),
});

const mapStateToProps = state => ({
  counter: state,
});

export default connect(mapStateToProps, mapDispathToProps)(SingUpForm);
