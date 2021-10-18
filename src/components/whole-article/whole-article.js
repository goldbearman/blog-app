import React from 'react';
// import ReactDom from 'react-dom';
import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
import PropTypes from 'prop-types';
import Article from '../article/article';

export const WholeArticle = ({ slug, arrArticles }) => {
  const item = arrArticles.filter(element => element.slug === slug.slag);
  // eslint-disable-next-line no-console
  console.log(item);
  return (
    <div>
      <Article item={item[0]} />
      {/* eslint-disable-next-line react/no-children-prop */}
      <ReactMarkdown children={item[0].body} />
    </div>
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
