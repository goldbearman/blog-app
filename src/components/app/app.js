import React, { useEffect } from 'react';
import './app.scss';
// ROUTER
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { compose } from 'redux';
// MATERIAL-UI
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// PROPTYPES
import PropTypes from 'prop-types';
// REDUX
import { useDispatch } from 'react-redux';
import { fetchArticles } from '../../redux/asyncAction';

// CUSTOM COMPONENTS
import NavBar from '../nav-bar/navbar';
import ArticleList from '../article-list/article-list';
import BlogService from '../../services/blog-service';
import WholeArticle from '../whole-article/whole-article';
import SingUpForm from '../form/singUpForm';
import SignInForm from '../form/signInForm';
import EditProfile from '../form/formEditProfile';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1890FF',
//     },
//     secondary: {
//       main: '#52C41A',
//     },
//   },
// });

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const blogService = new BlogService();
  const dispatch = useDispatch();
  // const store = useStore()

  useEffect(() => {
    console.log('useEffect');
    dispatch(fetchArticles());
  }, []);

  console.log('app');


  return (
    <Router>
      <NavBar />
      <Route
        path={['/', '/articles']}
        exact
        component={ArticleList}
      />
      <Route
        path="/articles/:slag"
        exact
        component={WholeArticle}
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
  );
};

App.propTypes = {
  counter: PropTypes.shape({
    stop: PropTypes.bool,
    progressBar: PropTypes.number,
  }),
  // getArticles: PropTypes.func,
};
App.defaultProps = {
  counter: {
    stop: false,
    progressBar: 0,
  },
  // getArticles: () => {},
};


// const mapDispathToProps = dispatch => ({
//   getArticles: () => dispatch(fetchArticles()),
// });
//
// const mapStateToProps = state => ({
//   counter: state,
// });
// export default connect(mapStateToProps, mapDispathToProps)(App);

export default App;
