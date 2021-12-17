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
  dispatch(onLoadin(false));
  blogService.getResourcesTemplateJson(`articles?limit=5&offset=${(page - 1) * 5}`, 'GET').then((res) => {
    dispatch(onInitialState(res));
  }, () => dispatch(onErrorLoading()));
};

export const asyncDeleteArticle = (slug, page) => (dispatch) => {
  dispatch(onLoadin(false));
  historyBlog.replace('/articles');
  blogService.getResourcesTemplate(`articles/${slug}`, 'DELETE').then(() => {
    dispatch(fetchArticles(page));
  });
};

export const fetchCreateArticle = (data, counter) => (dispatch) => {
  dispatch(onLoadin(false));
  historyBlog.replace('/articles');
  blogService.getResourcesTemplateJson('articles', 'POST', { article: data }).then(() => {
    dispatch(fetchArticles(counter.page));
  });
};

export const asyncEditArticle = (newData, counter, slug) => (dispatch) => {
  if (slug) {
    blogService.getResourcesTemplate(`articles/${slug}`, 'DELETE').then(() => {
      dispatch(fetchCreateArticle(newData, counter));
    });
  } else dispatch(fetchCreateArticle(newData, counter));
};

export const fetchArticle = slug => (dispatch) => {
  blogService.getResourcesTemplateJson(`articles/${slug}`, 'GET').then((res) => {
    dispatch(onGetArticle(res.article));
  });
};

export const fetchAuthentication = data => (dispatch) => {
  blogService.getResourcesTemplateJson('users/login', 'POST', { user: data }).then((res) => {
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
  blogService.getResourcesTemplateJson('users', 'POST', { user: data }).then((res) => {
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
  dispatch(onLoadin(false));
  blogService.getResourcesTemplateJson('user', 'PUT', { user: data }).then((res) => {
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
  blogService.getResourcesTemplateJson(`articles/${slug}/favorite`, 'POST').then((res) => {
    dispatch(onGetArticle(res.article));
  });
};
export const fetchSetUnFavorite = slug => (dispatch) => {
  blogService.getResourcesTemplateJson(`articles/${slug}/favorite`, 'DELETE').then((res) => {
    dispatch(onGetArticle(res.article));
  });
};
