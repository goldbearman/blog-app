import React, { useEffect, useState } from 'react';

import './app.scss';
import NavBar from '../nav-bar/navbar';
import ArticleList from '../article-list/article-list';
import BlogService from '../../services/blog-service';

const App = () => {
  const [arrArticles, setArrArticles] = useState([]);
  const blogService = new BlogService();

  useEffect(() => {
    blogService.getAllArticles().then((articles) => {
      // eslint-disable-next-line no-console
      console.log(articles);
      setArrArticles(articles);
    });
  }, []);

  return (
    <>
      <NavBar />
      <ArticleList arrArticles={arrArticles} />
    </>
  );
};

export default App;
