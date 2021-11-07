import React, { useState } from 'react';
// import { withRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
// UI DESIGN
import { Pagination } from '@mui/material';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
// import * as actions from '../../redux/actions';
// COMPONENTS
import Article from '../article/article';
import classes from './article-list.module.scss';
import { fetchArticles } from '../../redux/asyncAction';

const ArticleList = ({ history }) => {
  const store = useSelector(state => state);
  const dispatch = useDispatch();

  console.log(store);

  const [pageNumber, setPageNumber] = useState(1);

  const createList = () => {
    const elements = store.arrArticles.map((data) => {
      const { slug } = data;
      return (
        <Article
          item={data}
          key={slug}
          onItemClick={() => {
            console.log(slug);
            console.log(history);
            history.push(`articles/${slug}`);
          }}
        />
      );
    });
    return elements;
  };

  const onChangePage = (event, page) => {
    console.log(page);
    setPageNumber(page);
    dispatch(fetchArticles(page));
  };

  return (
    <>
      {createList()}
      <div className={classes.paginationContainer}>
        <Pagination
          className={classes.pagination}
          onChange={onChangePage}
          page={pageNumber}
          shape="rounded"
          count={Math.floor(store.articlesCount / 5)}
          defaultPage={1}
          color="primary"
        />
      </div>
    </>
  );
};

ArticleList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  counter: PropTypes.shape({
    arrArticles: PropTypes.arrayOf(PropTypes.object),
    articlesCount: PropTypes.number,
  }),
};

ArticleList.defaultProps = {
  history: {
    push: () => {
    },
  },
  counter: {
    arrArticles: [],
    articlesCount: 0,
  },
};
//
// const mapStateToProps = state => ({
//   counter: state,
// });

export default withRouter(ArticleList);
