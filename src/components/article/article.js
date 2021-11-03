import React from 'react';
import PropTypes from 'prop-types';
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
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  onItemClick: PropTypes.func,
};

Article.defaultProps = {
  item: {},
  onItemClick: () => {},
};

export default Article;
