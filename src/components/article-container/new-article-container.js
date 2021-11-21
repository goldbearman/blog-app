import React from 'react';
// OTHER LIBRARIES
import PropTypes from 'prop-types';
// MATERIAL UI
import { Container } from '@material-ui/core';
// SCSS
import classes from '../article/article.module.scss';
// CUSTOM COMPONENTS
import { ArticleContainer } from './article-container';

export const NewArticleContainer = ({ children, ...props }) => (
  <Container className={classes.articleContainer} container="main" maxWidth="md" {...props}>
    {children}
  </Container>
);

ArticleContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
