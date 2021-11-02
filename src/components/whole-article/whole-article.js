import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useStore } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { fetchArticle } from '../../redux/asyncAction';

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
