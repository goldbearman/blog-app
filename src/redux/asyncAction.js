import {
  onInitialState, onAuthentication, onRegistration, onErrorRegistration, onGetArticle,
  onEditUser, onErrorAuthentication, onButtonActive, onErrorLoading, onLoadin,
} from './actions';
import BlogService from '../services/blog-service';


let historyBlog;
const blogService = new BlogService();

export const initAsyncActionHistory = (history) => {
  historyBlog = history;
};

export const initBlogServiceToken = () => {
  const localUser = localStorage.getItem('user');
  if (localUser) {
    const user = JSON.parse(localUser);
    blogService.token = user.token;
  } else blogService.token = undefined;
};

export const fetchArticles = (page, history) => (dispatch) => {
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
    blogService.token = res.user.token;
    localStorage.setItem('user', JSON.stringify(res.user));
    dispatch(onAuthentication(res.user));
    dispatch(onButtonActive(''));
    console.log(res.user.token);
    historyBlog.push('/articles');
  }, () => dispatch(onErrorAuthentication(true)));
};

export const fetchRegistration = data => (dispatch) => {
  blogService.registration(data).then((res) => {
    if (res.errors) {
      dispatch(onErrorRegistration(res.errors));
    } else {
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
    localStorage.setItem('user', JSON.stringify(res.user));
    blogService.token = res.user.token;
    dispatch(onEditUser(res.user));
    dispatch(fetchArticles(1));
  }, () => dispatch(onErrorRegistration()));
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
