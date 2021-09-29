import React from 'react';
import Article from '../article/article';

const ArticleList = () => {
  let key = 100;

  const counter = [1];

  const createList = () => {
    const elements = counter.map(article => (
      <Article
        item={article}
        key={key++}
      />
    ));
    return elements;
  };

  return (
    createList()
  );
};

export default ArticleList;
