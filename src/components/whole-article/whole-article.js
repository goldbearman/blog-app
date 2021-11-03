import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useStore } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
// import { Container } from '@material-ui/core';
import { fetchArticle } from '../../redux/asyncAction';
import { ArticleContainer } from '../article-container/article-container';
// import { NewArticleContainer } from '../article-container/new-article-container';
import ArticleContent from '../article/article-content';

const WholeArticle = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const location = useLocation();
  const { slag } = useParams();

  useEffect(() => {
    console.log('useEffect');
    dispatch(fetchArticle(slag));
  }, [location]);

  console.log(store.getState());
  return (
    <ArticleContainer>
      <ArticleContent item={store.getState().article} key={document.location.href} />
    </ArticleContainer>
  );
};


WholeArticle.propTypes = {
  slug: PropTypes.shape({
    slag: PropTypes.string,
  }),
  counter: PropTypes.shape({
    article: PropTypes.shape({
      body: PropTypes.string,
    }),
  }),
};

WholeArticle.defaultProps = {
  slug: {
    slag: '',
  },
  counter: {
    article: {},
  },
};

export default WholeArticle;
