import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
// import { Container } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import classes from './form.module.scss';
import { FormContainer } from './formContainer';
import { fetchEditUser } from '../../redux/asyncAction';
// import { onEditUserName } from '../../redux/actions';

const SignInSchema = yup.object().shape({
  'User name': yup.string().min(3).max(20).nullable(),
  'Email address': yup.string().email().nullable(),
  Password: yup.string().min(6).max(40).nullable(),
  'Avatar image': yup.string().url().nullable(),
});

function EditProfile() {
  console.log('editProfile');
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
    // eslint-disable-next-line no-param-reassign
    data = {
      username: data['User name'],
      email: data['Email address'],
      image: data.image,
      password: data.Password,
      bio: 'I like to skateboard',
    };
    console.log(data);
    console.log(user.token);
    dispatch(fetchEditUser(data, user.token));
  };

  // eslint-disable-next-line no-unused-vars
  const checkAgree = watch('checkAgree');

  const handleChange = (e) => {
    console.log('in');
    console.log(e.target.value);
    // dispatch(onEditUserName(e.target.value));
    // newUser.username
  };

  console.log(errors);

  return (
    <FormContainer>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          UserName
          <input
            defaultValue={user.username}
            onBlur={() => handleChange()}
            className={cn(errors?.['User name'] && classes.error)}
            type="text"
            placeholder="Username"
            {...register('User name', { required: false })}
          />
        </label>
        <p>{errors?.['User name'] && errors?.['User name']?.message}</p>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Email address
          <input
            defaultValue={user.email}
            onChange={() => handleChange()}
            className={cn(errors?.['Email address'] && classes.error)}
            type="text"
            placeholder="Email address"
            {...register('Email address', { required: false })}
          />
        </label>
        <p>{errors?.['Email address'] && errors?.['Email address']?.message}</p>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          New password
          <input
            onChange={() => handleChange()}
            className={cn(errors?.Password && classes.error)}
            type="password"
            placeholder="New password"
            {...register('Password', { required: false })}
          />
        </label>
        <p>{errors?.Password && errors?.Password?.message}</p>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Avatar image (url)
          <input
            defaultValue={user.image}
            onChange={() => handleChange()}
            className={cn(errors?.Password && classes.error)}
            type="text"
            placeholder="Avatar image"
            {...register('Avatar image', { required: false })}
          />
        </label>
        <p>{errors?.Password && errors?.Password?.message}</p>

        <input className={classes.submitButton} value="Save" type="submit" />
      </form>
    </FormContainer>
  );
}

export default EditProfile;
