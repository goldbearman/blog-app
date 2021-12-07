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

export const fetchArticles = (page, history) => (dispatch) => {
  console.log('fetchArticles');
  dispatch(onLoadin(false));
  blogService.getUserArticles(page).then((res) => {
    if (history) {
      historyBlog.push('/articles');
    }
    dispatch(onInitialState(res));
  }, () => dispatch(onErrorLoading()));
};

export const asyncDeleteArticle = (slug, page) => (dispatch) => {
  console.log(slug, page);
  dispatch(onLoadin(false));
  historyBlog.push('/articles');
  blogService.fetchDeleteArticle(slug).then(() => {
    dispatch(fetchArticles(page));
  });
};

export const fetchCreateArticle = (data, counter) => (dispatch) => {
  console.log(historyBlog);
  dispatch(onLoadin(false));
  historyBlog.push('/articles');
  blogService.createArticle(data).then(() => {
    dispatch(fetchArticles(counter.page));
  });
};

export const asyncEditArticle = (newData, counter, slug) => (dispatch) => {
  console.log(newData, counter, slug);
  if (slug) {
    console.log(slug);
    blogService.fetchDeleteArticle(slug).then(() => {
      dispatch(fetchCreateArticle(newData, counter));
    });
  } else dispatch(fetchCreateArticle(newData, counter));
};

export const fetchArticle = slug => (dispatch) => {
  blogService.getArticle(slug).then((res) => {
    dispatch(onGetArticle(res.article));
  });
};

export const fetchAuthentication = data => (dispatch) => {
  blogService.authentication(data).then((res) => {
    console.log(res);
    if (res.errors) {
      console.log(res.errors);
      dispatch(onErrorAuthentication(res.errors));
    } else {
      localStorage.setItem('user', JSON.stringify(res.user));
      dispatch(onAuthentication(res.user));
      dispatch(onButtonActive(''));
      historyBlog.push('/articles');
    }
  }, () => dispatch(onErrorLoading()));
};

export const fetchRegistration = data => (dispatch) => {
  console.log('fetchRegistration');
  blogService.registration(data).then((res) => {
    if (res.errors) {
      console.log('if');
      dispatch(onErrorRegistration(res.errors));
    } else {
      console.log('else');
      dispatch(onRegistration(res.user));
      dispatch(onButtonActive('in'));
      historyBlog.push('/sing-in');
    }
  }, () => dispatch(onErrorLoading()));
};

export const fetchEditUser = data => (dispatch) => {
  dispatch(onLoadin(false));
  historyBlog.push('/articles');
  blogService.editUser(data).then((res) => {
    console.log(res);
    if (typeof res === 'string') {
      console.log('if');
      dispatch(onErrorEditUser(res));
    } else {
      console.log('if');
      localStorage.setItem('user', JSON.stringify(res.user));
      dispatch(onEditUser(res.user));
      dispatch(fetchArticles(1));
    }
  }, () => dispatch(onErrorLoading()));
};

export const fetchSetFavorite = slug => (dispatch) => {
  blogService.setFavorite(slug).then((res) => {
    dispatch(onGetArticle(res.article));
  });
};
export const fetchSetUnFavorite = slug => (dispatch) => {
  blogService.setUnFavorite(slug).then((res) => {
    dispatch(onGetArticle(res.article));
  });
};
