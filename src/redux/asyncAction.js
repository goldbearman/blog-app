import { onInitialState, onAuthentication, onRegistration } from './actions';
import BlogService from '../services/blog-service';

const blogService = new BlogService();

export const fetchArticles = () => (dispatch) => {
  blogService.getAllArticles().then((res) => {
    // eslint-disable-next-line no-console
    console.log(res);
    dispatch(onInitialState(res));
  });
};

export const fetchAuthentication = data => (dispatch) => {
  blogService.authentication(data).then((res) => {
    // eslint-disable-next-line no-console
    console.log(res);
    dispatch(onAuthentication(res));
    onLogin(true);
    history.push('/articles');
  });
};

// blogService.authentication(data).then((responseBody) => {
//   // eslint-disable-next-line no-console
//   console.log(responseBody);
//   onLogin(true);
//   history.push('/articles');
//   // localStorage.setItem('user', responseBody.user);
//   // eslint-disable-next-line no-console
// }, () => (
//   // setSignInError(true)
//   console.log('catch')
// ));

export const fetchRegistration = data => (dispatch) => {
  blogService.registration(data).then((res) => {
    // eslint-disable-next-line no-console
    console.log(res);
    dispatch(onRegistration(res));
    history.push('/articles');
  });
};

//
// blogService.registration(data).then((responseBody) => {
//   // eslint-disable-next-line no-console
//   console.log(responseBody);
//   history.push('/sing-in');
//   localStorage.setItem('user', responseBody.user);
// }, alert(data));

// value.blogService.registration(data).then((responseBody) => {
//   // eslint-disable-next-line no-console
//   console.log(responseBody);
//   history.push('/sing-in');
//   localStorage.setItem('user', responseBody.user);
// }, alertText(data));
