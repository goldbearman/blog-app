// eslint-disable-next-line import/named
import {
  onInitialState, onAuthentication, onRegistration, onErrorRegistration, onGetArticle, onEditUser,
} from './actions';
import BlogService from '../services/blog-service';

const blogService = new BlogService();

export const fetchArticles = page => (dispatch) => {
  blogService.getAllArticles(page).then((res) => {
    // eslint-disable-next-line no-console
    console.log(res);
    dispatch(onInitialState(res));
  });
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
    console.log(res);
    dispatch(onAuthentication(res.user));
    // onLogin(true);
    history.push('/articles');
  });
};

export const fetchRegistration = (data, history) => (dispatch) => {
  blogService.registration(data).then((res) => {
    dispatch(onRegistration(res.user));
    history.push('/sing-in');
  }, () => dispatch(onErrorRegistration()));
};

export const fetchEditUser = data => (dispatch) => {
  blogService.editUser(data).then((res) => {
    dispatch(onEditUser(res.user));
  }, () => dispatch(onErrorRegistration()));
};
