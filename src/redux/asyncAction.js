import {
  onInitialState, onAuthentication, onRegistration, onErrorRegistration, onGetArticle,
  onEditUser, onErrorAuthentication, onButtonActive, onErrorLoading, onLoadin,
} from './actions';
import BlogService from '../services/blog-service';

const blogService = new BlogService();

export const fetchArticles = (page, token, history) => (dispatch) => {
  dispatch(onLoadin(false));
  blogService.getUserArticles(page, token).then((res) => {
    if (history) history.push('/articles');
    dispatch(onInitialState(res));
  }, () => dispatch(onErrorLoading()));
};

export const fetchArticle = (slug, token) => (dispatch) => {
  blogService.getArticle(slug, token).then((res) => {
    dispatch(onGetArticle(res.article));
  });
};

export const fetchAuthentication = (data, history) => (dispatch) => {
  blogService.authentication(data).then((res) => {
    localStorage.setItem('user', JSON.stringify(res.user));
    dispatch(onAuthentication(res.user));
    dispatch(onButtonActive(''));
    history.push('/articles');
  }, () => dispatch(onErrorAuthentication(true)));
};

export const fetchRegistration = (data, history) => (dispatch) => {
  blogService.registration(data).then((res) => {
    if (res.errors) {
      dispatch(onErrorRegistration(res.errors));
    } else {
      dispatch(onRegistration(res.user));
      dispatch(onButtonActive('in'));
      history.push('/sing-in');
    }
  }, () => dispatch(onErrorLoading()));
};

export const fetchEditUser = (data, token, history) => (dispatch) => {
  dispatch(onLoadin(false));
  history.push('/articles');
  blogService.editUser(data, token).then((res) => {
    localStorage.setItem('user', JSON.stringify(res.user));
    dispatch(onEditUser(res.user));
    dispatch(fetchArticles(1, res.user.token));
  }, () => dispatch(onErrorRegistration()));
};

export const fetchCreateArticle = (data, counter, history) => (dispatch) => {
  dispatch(onLoadin(false));
  history.push('/articles');
  blogService.createArticle(data, counter.user.token).then(() => {
    dispatch(fetchArticles(counter.page, counter.user.token));
  });
};

export const fetchSetFavorite = (slug, token) => (dispatch) => {
  blogService.setFavorite(slug, token).then((res) => {
    dispatch(onGetArticle(res.article));
  });
};
export const fetchSetUnFavorite = (slug, token) => (dispatch) => {
  blogService.setUnFavorite(slug, token).then((res) => {
    dispatch(onGetArticle(res.article));
  });
};
