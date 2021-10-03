import React from 'react';
import { useForm } from 'react-hook-form';
// import { Formik } from 'formik';
import * as yup from 'yup';
import { Container } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './form.module.scss';

const SignupSchema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup.number().required().positive().integer(),
  website: yup.string().url(),
});

function SingInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    mode: 'all',
  });
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  // eslint-disable-next-line no-console
  console.log(errors);
  // eslint-disable-next-line no-console
  console.log(errors?.firstName);

  return (
    <Container className={classes.windowForm}>
      <h1>Create new account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          First Name
          <input
            {...register('firstName', {
              required: true,
              minLength: 3,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
        </label>
        {errors?.firstName?.type === 'required' && <p>This field is required</p>}
        {errors?.firstName?.type === 'maxLength' && (
          <p>First name cannot exceed 20 characters</p>
        )}
        {errors?.firstName?.type === 'minLength' && (
          <p>First name cannot exceed min 3 characters</p>
        )}
        {errors?.firstName?.type === 'pattern' && (
          <p>Alphabetical characters only</p>
        )}
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Last Name
          <input {...register('lastName', {
            required: true,
            pattern: /^[A-Za-z]+$/i,
          })}
          />
        </label>
        {errors?.lastName?.type === 'required' && <p>This field is required</p>}
        {errors?.lastName?.type === 'pattern' && (
          <p>Alphabetical characters only</p>
        )}
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Age
          <input {...register('age', { min: 18, max: 99 })} />
        </label>
        {errors.age && (
          <p>You Must be older then 18 and younger then 99 years old</p>
        )}
        <input type="submit" />
      </form>
    </Container>
  );
}

export default SingInForm;
