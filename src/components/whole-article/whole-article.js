import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { ArticleContainer } from '../article-container/article-container';
import ArticleContent from '../article/article-content';
import * as actions from '../../redux/actions';

const WholeArticle = ({ slug, counter: { arrArticles } }) => {
  console.log(arrArticles);

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
  counter: PropTypes.shape({
    arrArticles: PropTypes.arrayOf(PropTypes.object),
  }),
};

WholeArticle.defaultProps = {
  slug: 'hi',
  counter: {
    arrArticles: [],
  },
};

const mapStateToProps = state => ({
  counter: state,
});

export default compose(
  withRouter, connect(mapStateToProps, actions),
)(WholeArticle);
