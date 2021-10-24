import React from 'react';
import { withRouter } from 'react-router-dom';
import { Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import Article from '../article/article';
import classes from './article-list.module.scss';
// import SignInForm from '../form/signInForm';

const ArticleList = ({ arrArticles, history, articlesCount }) => {
  let key = 100;
  // eslint-disable-next-line no-console
  console.log(arrArticles);

  const createList = () => {
    const elements = arrArticles.map((data) => {
      const { slug } = data;
      return (
        <Article
          item={data}
          onItemClick={() => {
            // eslint-disable-next-line no-console
            console.log('click');
            history.push(`/articles/${slug}`);
          }}
          key={key++}
        />
      );
    });
    return elements;
  };

  return (
    <>
      {createList()}
      <div className={classes.paginationContainer}>
        <Pagination className={classes.pagination} count={Math.floor(articlesCount / 5)} defaultPage={1} color="primary" />
      </div>
    </>
  );
};

ArticleList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  arrArticles: PropTypes.arrayOf(PropTypes.object),
  articlesCount: PropTypes.number,
};

ArticleList.defaultProps = {
  history: {
    push: () => {},
  },
  arrArticles: [],
  articlesCount: 0,
};

export default withRouter(ArticleList);
