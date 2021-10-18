import React from 'react';
import { withRouter } from 'react-router-dom';
import Article from '../article/article';

const ArticleList = ({ arrArticles, history }) => {
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
    createList()
  );
};

export default withRouter(ArticleList);
