// eslint-disable-next-line import/named
import {
  onInitialState, onAuthentication, onRegistration, onErrorRegistration, onGetArticle,
  onEditUser, onErrorAuthentication, onButtonActive,
} from './actions';
import BlogService from '../services/blog-service';

const blogService = new BlogService();


export const fetchArticles = (page, token, history) => (dispatch) => {
  console.log(token);
  blogService.getUserArticles(page, token).then((res) => {
    console.log(res);
    if (history) history.push('/articles');
    dispatch(onInitialState(res));
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
    console.log(res.user);
    localStorage.setItem('user', JSON.stringify(res.user));
    dispatch(onAuthentication(res.user));
    dispatch(onButtonActive(''));
    history.push('/articles');
  }, () => dispatch(onErrorAuthentication(true)));
};

export const fetchRegistration = (data, history) => (dispatch) => {
  blogService.registration(data).then((res) => {
    // localStorage.setItem('user', res.user);
    console.log(res);
    console.log(res.errors);
    if (res.errors) {
      dispatch(onErrorRegistration(res.errors));
    } else {
      dispatch(onRegistration(res.user));
      dispatch(onButtonActive('in'));
      history.push('/sing-in');
    }
  }, (e) => {
    console.log(e.message);
  });
};

export const fetchEditUser = (data, token, history) => (dispatch) => {
  blogService.editUser(data, token).then((res) => {
    console.log(res);
    localStorage.setItem('user', JSON.stringify(res.user));
    dispatch(onEditUser(res.user));
    dispatch(fetchArticles(1, res.user.token, history));
  }, () => dispatch(onErrorRegistration()));
};

export const fetchCreateArticle = (data, counter, history) => (dispatch) => {
  blogService.createArticle(data, counter.user.token).then(() => {
    dispatch(fetchArticles(counter.page, counter.user.token, history));
    // blogService.getUserArticles(counter.page, counter.user.token).then((res) => {
    //   console.log(res);
    //   history.push('/articles');
    //   dispatch(onInitialState(res));
    // }, () => dispatch(onErrorRegistration()));
  });
};
