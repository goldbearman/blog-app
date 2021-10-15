import React from 'react';
import Article from '../article/article';

const ArticleList = ({ arrArticles }) => {
  let key = 100;
  // eslint-disable-next-line no-console
  console.log(arrArticles);

  const createList = () => {
    const elements = arrArticles.map(data => (
      <Article
        item={data}
        onItem
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
