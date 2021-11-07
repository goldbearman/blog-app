import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import cn from 'classnames';
import classes from './form.module.scss';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(7),
    width: '384px',
    padding: '32px',
    borderRadius: '6px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItim: 'center',
    boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
  },
}));

// eslint-disable-next-line react/prop-types,no-unused-vars
export const FormContainer = ({ children, ...props }) => {
  const styles = useStyles();

  return (
    <Container className={cn(styles.root, classes.formContainer)} container="main" maxWidth="xs" {...props}>
      {children}
    </Container>
  );
};
