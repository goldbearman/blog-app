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
  const article = useSelector(state => state.article);
  const getArticle = useSelector(state => state.getArticle);
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, []);

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
