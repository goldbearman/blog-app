// eslint-disable-next-line import/named
import {
  onInitialState, onAuthentication, onRegistration, onErrorRegistration,
} from './actions';
import BlogService from '../services/blog-service';

const blogService = new BlogService();

export const fetchArticles = () => (dispatch) => {
  blogService.getAllArticles().then((res) => {
    // eslint-disable-next-line no-console
    console.log(res);
    dispatch(onInitialState(res));
  });
};

export const fetchAuthentication = (data, history) => (dispatch) => {
  blogService.authentication(data).then((res) => {
    // eslint-disable-next-line no-console
    console.log(res);
    dispatch(onAuthentication(res));
    // onLogin(true);
    history.push('/articles');
  });
};

export const fetchRegistration = (data, history) => (dispatch) => {
  blogService.registration(data).then((res) => {
    dispatch(onRegistration(res));
    history.push('/sing-in');
  }, () => dispatch(onErrorRegistration(true)));
};
