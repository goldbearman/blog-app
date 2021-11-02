import React, { useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { useDispatch, useStore } from 'react-redux';
// import { compose } from 'redux';
// import { withRouter } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
// import { ArticleContainer } from '../article-container/article-container';
// import ArticleContent from '../article/article-content';
import { fetchArticle } from '../../redux/asyncAction';
// import * as actions from '../../redux/actions';

const WholeArticle = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const location = useLocation();
  const { slag } = useParams();

  useEffect(() => {
    console.log('useEffect');
    dispatch(fetchArticle(slag));
  }, [location]);

  console.log(store.article);
  return (
    <div>
      {store.article}
    </div>
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
