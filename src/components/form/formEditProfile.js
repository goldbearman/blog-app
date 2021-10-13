import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
// import { Container } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import classes from './form.module.scss';
import { FormContainer } from './formContainer';

const SignInSchema = yup.object().shape({
  'User name': yup.string().min(3).max(20).required(),
  'Email address': yup.string().email().required(),
  Password: yup.string().min(6).max(40).required('Поле обязательно!'),
  'Avatar image': yup.string().url(),
});


function EditProfile() {
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
    alert(JSON.stringify(data));
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
      <h1>Edit Profile</h1>
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
          New password
          <input
            className={cn(errors?.Password && classes.error)}
            type="password"
            placeholder="New password"
            {...register('Password')}
          />
        </label>
        <p>{errors?.Password && errors?.Password?.message}</p>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Avatar image (url)
          <input
            className={cn(errors?.Password && classes.error)}
            type="password"
            placeholder="Avatar image"
            {...register('Avatar image')}
          />
        </label>
        <p>{errors?.Password && errors?.Password?.message}</p>

        <input className={classes.submitButton} value="Create" type="submit" />
      </form>
    </FormContainer>
  );
}

export default EditProfile;
