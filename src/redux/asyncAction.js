import {
  onInitialState, onAuthentication, onRegistration, onErrorRegistration, onGetArticle,
  onEditUser, onErrorAuthentication, onButtonActive, onErrorLoading, onLoadin, onErrorEditUser,
} from './actions';
import BlogService from '../services/blog-service';


let historyBlog;
const blogService = new BlogService();

export const initAsyncActionHistory = (history) => {
  historyBlog = history;
};

export const fetchArticles = page => (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('fetchArticles');
  dispatch(onLoadin(false));
  blogService.getUserArticles(page).then((res) => {
    // if (history) {
    //   historyBlog.replace('/articles');
    // }
    dispatch(onInitialState(res));
  }, () => dispatch(onErrorLoading()));
};

export const asyncDeleteArticle = (slug, page) => (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('asyncDeleteArticle');
  dispatch(onLoadin(false));
  historyBlog.replace('/articles');
  blogService.fetchDeleteArticle(slug).then(() => {
    dispatch(fetchArticles(page));
  });
};

export const fetchCreateArticle = (data, counter) => (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('fetchCreateArticle');
  dispatch(onLoadin(false));
  historyBlog.replace('/articles');
  blogService.createArticle(data).then(() => {
    dispatch(fetchArticles(counter.page));
  });
};

export const asyncEditArticle = (newData, counter, slug) => (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('asyncEditArticle');
  if (slug) {
    blogService.fetchDeleteArticle(slug).then(() => {
      dispatch(fetchCreateArticle(newData, counter));
    });
  } else dispatch(fetchCreateArticle(newData, counter));
};

export const fetchArticle = slug => (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('fetchArticle');
  blogService.getArticle(slug).then((res) => {
    dispatch(onGetArticle(res.article));
  });
};

export const fetchAuthentication = data => (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('fetchAuthentication');
  blogService.authentication(data).then((res) => {
    if (res.errors) {
      dispatch(onErrorAuthentication(res.errors));
    } else {
      localStorage.setItem('user', JSON.stringify(res.user));
      dispatch(onAuthentication(res.user));
      dispatch(onButtonActive(''));
      historyBlog.replace('/articles');
    }
  }, () => dispatch(onErrorLoading()));
};

export const fetchRegistration = data => (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('fetchRegistration');
  blogService.registration(data).then((res) => {
    if (res.errors) {
      dispatch(onErrorRegistration(res.errors));
    } else {
      dispatch(onRegistration(res.user));
      dispatch(onButtonActive('in'));
      historyBlog.replace('/sing-in');
    }
  }, () => dispatch(onErrorLoading()));
};

export const fetchEditUser = data => (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('fetchEditUser');
  dispatch(onLoadin(false));
  blogService.editUser(data).then((res) => {
    if (typeof res === 'string') {
      dispatch(onErrorEditUser(res));
    } else {
      localStorage.setItem('user', JSON.stringify(res.user));
      historyBlog.replace('/articles');
      dispatch(onEditUser(res.user));
      dispatch(fetchArticles(1));
    }
  }, () => dispatch(onErrorLoading()));
};

export const fetchSetFavorite = slug => (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('fetchSetFavorite');
  blogService.setFavorite(slug).then((res) => {
    dispatch(onGetArticle(res.article));
  });
};
export const fetchSetUnFavorite = slug => (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('fetchSetUnFavorite');
  blogService.setUnFavorite(slug).then((res) => {
    dispatch(onGetArticle(res.article));
  });
};
