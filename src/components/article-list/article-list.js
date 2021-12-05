import React from 'react';
// REACT-ROUTER-DOM
import { useHistory } from 'react-router-dom';
// UI DESIGN
import { Pagination, CircularProgress, Alert } from '@mui/material';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../redux/asyncAction';
import { setPage } from '../../redux/actions';
// CUSTOM COMPONENTS
import Article from '../article/article';

import classes from './article-list.module.scss';

const ArticleList = () => {
  const store = useSelector(state => state);
  const errorLoading = useSelector(state => state.errorLoading);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();
  const history = useHistory();

  const createList = () => {
    const elements = store.arrArticles.map((data) => {
      const { slug } = data;
      return (
        <Article
          item={data}
          key={slug}
          onItemClick={() => {
            history.push(`/articles/${slug}/`);
          }}
        />
      );
    });
    return elements;
  };

  const onChangePage = (event, page) => {
    dispatch(setPage(page));
    dispatch(fetchArticles(page));
  };

  const onSpinner = !loading
    ? (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    ) : null;

  const onErrorMessage = errorLoading ? (
    <Alert className={classes.alertPosition} severity="warning">
      Ошибка сервера, перезапустите страницу!
    </Alert>
  ) : null;

  return (
    <>
      {onSpinner}
      {onErrorMessage}
      {!onErrorMessage && loading
        ? (
          <>
            {createList()}
            <div className={classes.paginationContainer}>
              <Pagination
                className={classes.pagination}
                onChange={onChangePage}
                page={store.page}
                shape="rounded"
                count={Math.ceil(store.articlesCount / 5)}
                defaultPage={1}
                color="primary"
              />
            </div>
          </>
        )
        : null}
    </>
  );
};
export default ArticleList;
