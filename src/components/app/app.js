import React, { useEffect } from 'react';
import './app.scss';
// REACT ROUTER DOM
import { Route } from 'react-router-dom';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../redux/asyncAction';
import { onAuthentication } from '../../redux/actions';
// CUSTOM COMPONENTS
import NavBar from '../nav-bar/navbar';
import ArticleList from '../article-list/article-list';
import WholeArticle from '../whole-article/whole-article';
import SingUpForm from '../form/singUpForm';
import SignInForm from '../form/signInForm';
import EditProfile from '../form/formEditProfile';
import NewArticle from '../new-article/new-article';


const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    let userToken;
    if (localUser) {
      const user = JSON.parse(localUser);
      userToken = user.token;
      dispatch(onAuthentication(user));
    } else userToken = undefined;
    dispatch(fetchArticles(1, userToken));
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
      </main>
    </>
  );
};

export default App;
