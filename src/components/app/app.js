import React, { useEffect } from 'react';
import './app.scss';
// ROUTER
import { BrowserRouter as Router, Route } from 'react-router-dom';
// MATERIAL-UI
import { createTheme, ThemeProvider } from '@mui/material/styles';
// PROPTYPES
import PropTypes from 'prop-types';
// REDUX
import { connect } from 'react-redux';
import { fetchArticles } from '../../redux/asyncAction';

// CUSTOM COMPONENTS
import NavBar from '../nav-bar/navbar';
import ArticleList from '../article-list/article-list';
import BlogService from '../../services/blog-service';
import WholeArticle from '../whole-article/whole-article';
import SingUpForm from '../form/singUpForm';
import SignInForm from '../form/signInForm';
import EditProfile from '../form/formEditProfile';

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

const App = ({ getArticles }) => {
  // eslint-disable-next-line no-unused-vars
  const blogService = new BlogService();

  useEffect(() => {
    getArticles();
  }, []);

  // const onLogIn = (bool) => {
  //   // eslint-disable-next-line no-console
  //   console.log(bool);
  //   setIsLoggedIn(bool);
  // };

  return (
    <ThemeProvider theme={theme}>
      {/* <BlogContext.Provider value={{ blogService, isLoggedIn }}> */}
      <Router>
        <NavBar />
        {/* <ArticleList arrArticles={arrArticles}/> */}
        <Route
          path="/"
          exact
          render={({ history }) => (
            <ArticleList history={history} />)}
        />
        <Route
          path="/articles"
          exact
          render={history => (
            <ArticleList history={history} />)}
        />
        <Route
          path="/articles/:slag"
          render={({ match }) => {
            // eslint-disable-next-line no-console
            console.log(match);
            return <WholeArticle slug={match.params} />;
          }}
        />
        <Route
          path="/sing-up"
          render={({ history }) => (<SingUpForm history={history} />)}
        />
        <Route
          path="/sing-in"
          render={({ history }) => (
            <SignInForm history={history} />)}
        />
        <Route path="/profile" render={() => (<EditProfile />)} />
      </Router>
      {/* </BlogContext.Provider> */}
    </ThemeProvider>
  );
};

App.propTypes = {
  counter: PropTypes.shape({
    stop: PropTypes.bool,
    progressBar: PropTypes.number,
  }),
  getArticles: PropTypes.func,
};
App.defaultProps = {
  counter: {
    stop: false,
    progressBar: 0,
  },
  getArticles: () => {},
};


const mapDispathToProps = dispatch => ({
  getArticles: () => dispatch(fetchArticles()),
});

const mapStateToProps = state => ({
  counter: state,
});
export default connect(mapStateToProps, mapDispathToProps)(App);
