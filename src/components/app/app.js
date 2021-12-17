import React, { useEffect } from 'react';
import './app.scss';
// REACT ROUTER DOM
import { Route, useHistory } from 'react-router-dom';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, initAsyncActionHistory } from '../../redux/asyncAction';
import { onAuthentication } from '../../redux/actions';
// CUSTOM COMPONENTS
import NavBar from '../nav-bar/navbar';
import ArticleList from '../article-list/article-list';
import WholeArticle from '../whole-article/whole-article';
import SingUpForm from '../forms/singUpForm';
import SignInForm from '../forms/signInForm';
import EditProfile from '../forms/formEditProfile';
import NewArticle from '../new-article/new-article';
import PrivateRoute from '../private-router/private-router';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const history = useHistory();
  initAsyncActionHistory(history);
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const user = JSON.parse(localUser);
      dispatch(onAuthentication(user));
    }
    dispatch(fetchArticles(1, history));
  }, [isLoggedIn]);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Route
          path={['/', '/articles/']}
          exact
          component={ArticleList}
        />
        <Route
          exact
          path="/articles/:slug"
          component={WholeArticle}
        />
        <PrivateRoute
          exact
          path="/articles/:slug/edit"
          component={NewArticle}
          auth={isLoggedIn}
          redirect="/articles/sing-in"
        />
        <Route
          exact
          path="/new-article"
          component={NewArticle}
          auth={isLoggedIn}
          redirect="/articles/sing-in"
        />
        <Route
          path="/sing-up"
          component={SingUpForm}
          exact
        />
        <Route
          path="/sing-in"
          component={SignInForm}
        />
        <PrivateRoute
          path="/profile"
          auth={isLoggedIn}
          component={EditProfile}
          redirect="/articles/sing-in"
        />
      </main>
    </>
  );
};

export default App;
