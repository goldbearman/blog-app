export const ON_LOGIN = 'ON_LOGIN';
export const ON_EDIT_USER = 'ON_EDIT_USER';
export const INITIAL_STATE = 'INITIAL_STATE';
export const REGISTRATION = 'REGISTRATION';
export const AUTHENTICATION = 'AUTHENTICATION';
export const ERROR_REGISTRATION = 'ERROR_REGISTRATION';
export const ERROR_AUTHENTICATION = 'ERROR_AUTHENTICATION';
export const ON_GET_ARTICLE = 'ON_GET_ARTICLE';
export const ON_GET_ARTICLE_FALSE = 'ON_GET_ARTICLE_FALSE';
export const ON_EDIT_USER_NAME = 'ON_EDIT_USER_NAME';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const SET_PAGE = 'SET_PAGE';

export const onLogin = bool => ({ type: ON_LOGIN, bool });
export const onInitialState = res => ({ type: INITIAL_STATE, res });
export const onRegistration = res => ({ type: REGISTRATION, res });
export const onEditUser = res => ({ type: ON_EDIT_USER, res });
export const onAuthentication = user => ({ type: AUTHENTICATION, user });
export const onErrorRegistration = () => ({ type: ERROR_REGISTRATION });
export const onErrorAuthentication = bool => ({ type: ERROR_AUTHENTICATION, bool });
export const onGetArticle = article => ({ type: ON_GET_ARTICLE, article });
export const onGetArticleFalse = () => ({ type: ON_GET_ARTICLE_FALSE });

export const onEditUserName = name => ({ type: ON_EDIT_USER_NAME, name });
export const addArticle = article => ({ type: ADD_ARTICLE, article });
export const setPage = page => ({ type: SET_PAGE, page });
