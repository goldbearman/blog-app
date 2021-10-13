import React, { useEffect, useState } from 'react';

import './app.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from '../nav-bar/navbar';
import ArticleList from '../article-list/article-list';
import BlogService from '../../services/blog-service';
// eslint-disable-next-line import/no-cycle
import SingUpForm from '../form/singUpForm';
import { SignInForm } from '../form/signInForm';
import EditProfile from '../form/formEditProfile';


export const BlogContext = React.createContext();

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [arrArticles, setArrArticles] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(true);

  const blogService = new BlogService();

  useEffect(() => {
    blogService.getAllArticles().then((articles) => {
      // eslint-disable-next-line no-console
      console.log(articles);
      setArrArticles(articles);
    });
  }, []);

  const onLogIn = () => {
    setisLoggedIn(true);
  };

  return (
    <BlogContext.Provider value={blogService}>
      <>
        <Router>
          <NavBar isLoggedIn={isLoggedIn} onLogin={onLogIn} />
          {/* <ArticleList arrArticles={arrArticles} /> */}
          <Route path="/articles" component={ArticleList} />
          <Route path="/sing-up" render={() => (<SingUpForm isLoggedIn={isLoggedIn} onLogin={onLogIn} />)} />
          <Route path="/sing-in" render={() => (<SignInForm isLoggedIn={isLoggedIn} onLogin={onLogIn} />)} />
          <Route path="/profile" render={() => (<EditProfile isLoggedIn={isLoggedIn} onLogin={onLogIn} />)} />
        </Router>
      </>
    </BlogContext.Provider>
  );
};

export default App;
