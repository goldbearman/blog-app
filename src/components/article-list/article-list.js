import React, { useState } from 'react';
// import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
// UI DESIGN
import { Pagination } from '@mui/material';
// REDUX
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../redux/actions';
// COMPONENTS
import Article from '../article/article';
import classes from './article-list.module.scss';


// const ArticleList = ({ arrArticles, history, articlesCount }) => {
const ArticleList = ({ history, counter: { arrArticles, articlesCount } }) => {
  console.log('ArticleList');
  let key = 100;

  const [pageNumber, setPageNumber] = useState(1);
  // eslint-disable-next-line no-console
  // console.log(arrArticles);

  const createList = () => {
    const elements = arrArticles.map((data) => {
      const { slug } = data;
      return (
        <Article
          item={data}
          onItemClick={() => {
            // eslint-disable-next-line no-console
            console.log(slug);
            history.push(`/articles/${slug}`);
          }}
          key={key++}
        />
      );
    });
    return elements;
  };

  const onChangePage = (event, page) => {
    console.log(page);
    setPageNumber(page);
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
          count={Math.floor(articlesCount / 5)}
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
    push: () => {},
  },
  counter: {
    arrArticles: [],
    articlesCount: 0,
  },
};

const mapStateToProps = state => ({
  counter: state,
});

// export default connect(mapStateToProps, actions)(ArticleList);

export default compose(
  withRouter, connect(mapStateToProps, actions),
)(ArticleList);
