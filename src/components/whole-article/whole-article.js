import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchArticle } from '../../redux/asyncAction';
import { ArticleContainer } from '../article-container/article-container';
import ArticleContent from '../article/article-content';
import { onGetArticleFalse } from '../../redux/actions';


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
