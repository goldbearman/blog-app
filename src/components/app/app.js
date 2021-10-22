import React, { useEffect, useState } from 'react';

import './app.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from '../nav-bar/navbar';
import ArticleList from '../article-list/article-list';
import BlogService from '../../services/blog-service';
import WholeArticle from '../whole-article/whole-article';
import SingUpForm from '../form/singUpForm';
import SignInForm from '../form/signInForm';
import EditProfile from '../form/formEditProfile';
import { BlogContext } from './blog-context';

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const blogService = new BlogService();
  const [arrArticles, setArrArticles] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);


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
    <BlogContext.Provider value={{ blogService, isLoggedIn }}>
      <>
        <Router>
          <NavBar isLoggedIn={isLoggedIn} onLogin={onLogIn} />
          {/* <ArticleList arrArticles={arrArticles}/> */}
          <Route path="/" exact render={() => (<ArticleList arrArticles={arrArticles} />)} />
          <Route path="/articles" exact render={() => (<ArticleList arrArticles={arrArticles} />)} />
          <Route
            path="/articles/:slag"
            render={({ match }) => {
              // eslint-disable-next-line no-console
              console.log(match);
              return <WholeArticle slug={match.params} arrArticles={arrArticles} />;
            }}
          />
          <Route
            path="/sing-up"
            render={({ history }) => (<SingUpForm isLoggedIn={isLoggedIn} history={history} />)}
          />
          <Route
            path="/sing-in"
            render={({ history }) => (
              <SignInForm isLoggedIn={isLoggedIn} history={history} onLogin={onLogIn} />)}
          />
          <Route path="/profile" render={() => (<EditProfile isLoggedIn={isLoggedIn} onLogin={onLogIn} />)} />
        </Router>
      </>
    </BlogContext.Provider>
  );
};

export default App;
