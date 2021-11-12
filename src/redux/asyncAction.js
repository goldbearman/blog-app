// eslint-disable-next-line import/named
import {
  onInitialState, onAuthentication, onRegistration, onErrorRegistration, onGetArticle,
  onEditUser,
} from './actions';
import BlogService from '../services/blog-service';

const blogService = new BlogService();


export const fetchArticles = (page, token, history) => (dispatch) => {
  console.log(token);
  blogService.getUserArticles(page, token).then((res) => {
    console.log(res);
    dispatch(onInitialState(res));
    if (history) history.push('/articles');
  }, () => dispatch(onErrorRegistration()));
};

export const fetchArticle = slug => (dispatch) => {
  blogService.getArticle(slug).then((res) => {
    // eslint-disable-next-line no-console
    console.log(res);
    dispatch(onGetArticle(res.article));
  });
};

export const fetchAuthentication = (data, history) => (dispatch) => {
  blogService.authentication(data).then((res) => {
    // eslint-disable-next-line no-console
    console.log(res.user.token);
    localStorage.setItem('token', res.user.token);
    dispatch(onAuthentication(res.user));
    history.push('/articles');
  });
};

export const fetchRegistration = (data, history) => (dispatch) => {
  blogService.registration(data).then((res) => {
    // localStorage.setItem('user', res.user);
    dispatch(onRegistration(res.user));
    history.push('/sing-in');
  }, () => dispatch(onErrorRegistration()));
};

export const fetchEditUser = data => (dispatch) => {
  blogService.editUser(data).then((res) => {
    dispatch(onEditUser(res.user));
  }, () => dispatch(onErrorRegistration()));
};

export const fetchCreateArticle = (data, token, history) => (dispatch) => {
  blogService.createArticle(data, token).then(() => {
    blogService.getUserArticles(0, token).then((res) => {
      console.log(res);
      dispatch(onInitialState(res));
      history.push('/articles');
    }, () => dispatch(onErrorRegistration()));
  });
};
