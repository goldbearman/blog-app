import React, { useEffect, useState } from 'react';

import './app.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// MATERIAL-UI
import { createTheme, ThemeProvider } from '@mui/material/styles';

// CUSTOM COMPONENTS
import NavBar from '../nav-bar/navbar';
import ArticleList from '../article-list/article-list';
import BlogService from '../../services/blog-service';
import WholeArticle from '../whole-article/whole-article';
import SingUpForm from '../form/singUpForm';
import SignInForm from '../form/signInForm';
import EditProfile from '../form/formEditProfile';

import { BlogContext } from './blog-context';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1890FF',
    },
    secondary: {
      main: '#52C41A',
    },
  },
});

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const blogService = new BlogService();
  const [arrArticles, setArrArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [isLoggedIn, setisLoggedIn] = useState(false);


  useEffect(() => {
    blogService.getAllArticles().then((res) => {
      // eslint-disable-next-line no-console
      console.log(res);
      setArrArticles(res.articles);
      setArticlesCount(res.articlesCount);
    });
  }, []);

  const onLogIn = (bool) => {
    // eslint-disable-next-line no-console
    console.log(bool);
    setisLoggedIn(bool);
  };

  return (
    <ThemeProvider theme={theme}>
      <BlogContext.Provider value={{ blogService, isLoggedIn }}>
        <Router>
          <NavBar isLoggedIn={isLoggedIn} onLogin={onLogIn} />
          {/* <ArticleList arrArticles={arrArticles}/> */}
          <Route
            path="/"
            exact
            render={() => (
              <ArticleList arrArticles={arrArticles} articlesCount={articlesCount} />)}
          />
          <Route
            path="/articles"
            exact
            render={() => (
              <ArticleList arrArticles={arrArticles} articlesCount={articlesCount} />)}
          />
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
          <Route path="/profile" render={() => (<EditProfile isLoggedIn={isLoggedIn} />)} />
        </Router>
      </BlogContext.Provider>
    </ThemeProvider>
  );
};

export default App;
