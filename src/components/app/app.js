import React, { useEffect } from 'react';
import './app.scss';
// ROUTER
import { Route } from 'react-router-dom';
// import { compose } from 'redux';
// MATERIAL-UI
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// PROPTYPES
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../redux/asyncAction';

// CUSTOM COMPONENTS
import NavBar from '../nav-bar/navbar';
import ArticleList from '../article-list/article-list';
import BlogService from '../../services/blog-service';
import WholeArticle from '../whole-article/whole-article';
import SingUpForm from '../form/singUpForm';
import SignInForm from '../form/signInForm';
import EditProfile from '../form/formEditProfile';
import NewArticle from '../new-article/new-article';

import { onAuthentication } from '../../redux/actions';

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
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  // const store = useStore()

  useEffect(() => {
    console.log('useEffect');
    const localUser = localStorage.getItem('user');
    console.log(localUser);
    let userToken;
    if (localUser) {
      const user = JSON.parse(localUser);
      userToken = user.token;
      dispatch(onAuthentication(user));
    } else userToken = undefined;
    console.log(userToken);
    dispatch(fetchArticles(1, userToken));
  }, [isLoggedIn]);

  return (
    <>
      <NavBar />
      <Route
        path={['/', '/articles']}
        exact
        component={ArticleList}
      />
      <Route
        exact
        path="/articles/:slag"
        component={WholeArticle}
      />
      <Route
        path="/articles/:slug/edit"
        component={NewArticle}
      />
      <Route
        path="/new-article"
        component={NewArticle}
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
    </>
  );
};

export default App;
