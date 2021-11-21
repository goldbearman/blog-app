import React from 'react';
// OTHER LIBRARIES
import PropTypes from 'prop-types';
// CUSTOM COMPONENTS
import { ArticleContainer } from '../article-container/article-container';
import ArticleContent from './article-content';

const Article = ({ item, onItemClick }) => {
  console.log(item);
  return (
    <ArticleContainer onClick={onItemClick}>
      <ArticleContent item={item} key={document.location.href} />
    </ArticleContainer>
  );
};

Article.propTypes = {
  item: PropTypes.objectOf(PropTypes.object),
  onItemClick: PropTypes.func,
};

Article.defaultProps = {
  item: {},
  onItemClick: () => {},
};

export default Article;
