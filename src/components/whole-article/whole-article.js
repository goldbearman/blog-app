import React, { useEffect } from 'react';
// OTHER LIBRARIES
import ReactMarkdown from 'react-markdown';
// REACT ROUTER DOM
import { useParams } from 'react-router-dom';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticle } from '../../redux/asyncAction';
import { onGetArticleFalse } from '../../redux/actions';
// CUSTOM COMPONENTS
import { ArticleContainer } from '../article-container/article-container';
import ArticleContent from '../article/article-content';

const WholeArticle = () => {
  const dispatch = useDispatch();
  const article = useSelector(state => state.article);
  const getArticle = useSelector(state => state.getArticle);
  const { slug } = useParams();

  useEffect(() => {
    console.log('useEffect');
    dispatch(fetchArticle(slug));
  }, []);

  useEffect(() => () => dispatch(onGetArticleFalse()), []);

  console.log(getArticle);
  return (
    <>
      {getArticle
      && (
        <ArticleContainer>
          <ArticleContent item={article} key={document.location.href} />
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </ArticleContainer>
      )}
    </>
  );
};

export default WholeArticle;
