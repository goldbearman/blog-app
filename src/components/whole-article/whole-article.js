import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ArticleContainer } from '../article-container/article-container';
import ArticleContent from '../article/article-content';


export const WholeArticle = ({ slug, arrArticles }) => {
  const item = arrArticles.filter(element => element.slug === slug.slag);
  // eslint-disable-next-line no-console
  console.log(item);
  return (
    <ArticleContainer>
      <ArticleContent item={item[0]} />
      {/* eslint-disable-next-line react/no-children-prop */}
      <ReactMarkdown children={item[0].body} />
    </ArticleContainer>
  );
};

WholeArticle.propTypes = {
  slug: PropTypes.string,
  arrArticles: PropTypes.arrayOf(PropTypes.object),
};

WholeArticle.defaultProps = {
  slug: 'hi',
  arrArticles: [],
};
