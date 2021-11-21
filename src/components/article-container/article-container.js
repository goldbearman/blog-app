import React from 'react';
// MATERIAL UI
import { Container } from '@mui/material';
// OTHER LIBRARIES
import PropTypes from 'prop-types';
// SCSS
import classes from '../article/article.module.scss';

export const ArticleContainer = ({ children, ...props }) => (
  <Container className={classes.articleContainer} container="main" maxWidth="md" {...props}>
    {children}
  </Container>
);

ArticleContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
