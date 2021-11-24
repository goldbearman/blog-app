import React from 'react';
// REACT HOOK FORM
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// OTHER LIBRARIES
import cn from 'classnames';
// REACT ROUTER DOM
import { useHistory } from 'react-router-dom';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditUser } from '../../redux/asyncAction';
// CUSTOM COMPONENTS
import { FormContainer } from './formContainer';

import classes from './form.module.scss';

const SignInSchema = yup.object().shape({
  // 'User name': yup.string().min(3).max(20).nullable(),
  'User name': yup
    .string()
    .nullable()
    .notRequired()
    .when('User name', {
      is: value => value?.length,
      then: rule => rule.min(3),
    }),
  // 'Email address': yup.string().email().nullable(),
  'Email address': yup
    .string()
    .nullable()
    .notRequired()
    .when('Email address', {
      is: value => value?.length,
      then: rule => rule.min(6),
    }),
  // Password: yup.string().min(6).max(40).nullable(),
  Password: yup
    .string()
    .nullable()
    .notRequired()
    .when('Password', {
      is: value => value?.length,
      then: rule => rule.min(6),
    }),
  'Avatar image': yup.string().url().nullable(),
},
[
  // Add Cyclic deps here because when require itself
  ['User name', 'User name'], ['Email address', 'Email address'], ['Password', 'Password'],
]);

function EditProfile() {
  const history = useHistory();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
    mode: 'all',
  });

  const onSubmit = (data) => {
    console.log(data);
    const result = {
      username: data['User name'],
      email: data['Email address'],
      image: data['Avatar image'],
      password: data.Password,
    };
    console.log(result);
    console.log(user.token);
    dispatch(fetchEditUser(result, user.token, history));
  };

  // eslint-disable-next-line no-unused-vars
  const checkAgree = watch('checkAgree');

  console.log(errors);

  return (
    <FormContainer>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="user name">
          UserName
          <input
            id="user name"
            className={cn(errors?.['User name'] && classes.error)}
            type="text"
            placeholder="Username"
            {...register('User name', { required: false })}
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
            {...register('Email address', { required: false })}
          />
        </label>
        <p>{errors?.['Email address'] && errors?.['Email address']?.message}</p>
        <label htmlFor="password">
          New password
          <input
            id="password"
            className={cn(errors?.Password && classes.error)}
            type="password"
            placeholder="New password"
            {...register('Password', { required: false })}
          />
        </label>
        <p>{errors?.Password && errors?.Password?.message}</p>
        <label htmlFor="avatar">
          Avatar image (url)
          <input
            id="avatar"
            className={cn(errors?.Password && classes.error)}
            type="text"
            placeholder="Avatar image"
            {...register('Avatar image', { required: false })}
          />
        </label>
        <p>{errors?.['Avatar image'] && errors?.['Avatar image']?.message}</p>

        <input className={classes.submitButton} value="Save" type="submit" />
      </form>
    </FormContainer>
  );
}

export default EditProfile;
