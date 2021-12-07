import React from 'react';
// REACT HOOK FORM
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// OTHER LIBRARIES
import cn from 'classnames';
// REACT ROUTER DOM

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditUser } from '../../redux/asyncAction';
// CUSTOM COMPONENTS
import { FormContainer } from './formContainer';

import classes from './form.module.scss';

const SignInSchema = yup.object().shape({
  'User name': yup.string().min(3).max(20).required(),
  'Email address': yup.string().email().required(),
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
  ['User name', 'User name'], ['Email address', 'Email address'], ['Password', 'Password'],
]);

function EditProfile() {
  const user = useSelector(state => state.user);
  const errorEditUser = useSelector(state => state.errorEditUser);
  const dispatch = useDispatch();
  console.log(errorEditUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
    mode: 'all',
  });

  const onSubmit = (data) => {
    const result = {
      username: data['User name'],
      email: data['Email address'],
      image: data['Avatar image'],
      password: data.Password,
    };
    dispatch(fetchEditUser(result));
  };

  return (
    <FormContainer>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="user name">
          UserName
          <input
            id="user name"
            defaultValue={user.username}
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
            defaultValue={user.email}
            className={cn(errors?.['Email address'] && classes.error)}
            type="text"
            placeholder="Email address"
            {...register('Email address')}
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
            className={cn(errors?.['Avatar image'] && classes.error)}
            type="text"
            placeholder="Avatar image"
            {...register('Avatar image', { required: false })}
          />
        </label>
        <p>{errors?.['Avatar image'] && errors?.['Avatar image']?.message}</p>
        <p>{errorEditUser && `${errorEditUser}`}</p>
        <input className={classes.submitButton} value="Save" type="submit" />
      </form>
    </FormContainer>
  );
}

export default EditProfile;
