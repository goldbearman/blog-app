import React, { useEffect } from 'react';
// OTHER LIBRARIES
import ReactMarkdown from 'react-markdown';
// REACT ROUTER DOM
import { useParams } from 'react-router-dom';
// UI DESIGN
import { CircularProgress } from '@mui/material';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticle } from '../../redux/asyncAction';
import { onGetArticleFalse } from '../../redux/actions';
// CUSTOM COMPONENTS
import { ArticleContainer } from '../article-container/article-container';
import ArticleContent from '../article/article-content';

import classes from '../article-list/article-list.module.scss';

const WholeArticle = () => {
  const dispatch = useDispatch();
  const { getArticle, user, article } = useSelector(state => state);
  const { slug } = useParams();
  // eslint-disable-next-line no-console
  console.log(getArticle, user, article);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('useEffect');
    dispatch(fetchArticle(slug, user?.token));
  }, [user?.token]);

  useEffect(() => () => dispatch(onGetArticleFalse()), []);
  return (
    <>
      {getArticle
        ? (
          <ArticleContainer>
            <ArticleContent item={article} key={document.location.href} />
            <ReactMarkdown className={classes.markdown}>{article.body}</ReactMarkdown>
          </ArticleContainer>
        )
        : <div className={classes.progressContainer}><CircularProgress /></div>
      }
    </>
  );
};

export default WholeArticle;
