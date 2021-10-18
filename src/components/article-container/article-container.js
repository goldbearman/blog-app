import React from 'react';
import { Container } from '@material-ui/core';
import classes from '../article/article.module.scss';

// eslint-disable-next-line react/prop-types,no-unused-vars
export const ArticleContainer = ({ children, ...props }) => (
  <Container className={classes.articleContainer} container="main" maxWidth="md" {...props}>
    {children}
  </Container>
);
