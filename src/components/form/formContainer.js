import React from 'react';
// MATERIAL UI
import { Container, makeStyles } from '@material-ui/core';
// OTHER LIBRARIES
import cn from 'classnames';
import PropTypes from 'prop-types';

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

export const FormContainer = ({ children, ...props }) => {
  const styles = useStyles();

  return (
    <Container className={cn(styles.root, classes.formContainer)} container="main" maxWidth="xs" {...props}>
      {children}
    </Container>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
