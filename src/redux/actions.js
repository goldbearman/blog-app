export const ON_LOGIN = 'ON_LOGIN';
export const INITIAL_STATE = 'INITIAL_STATE';
export const REGISTRATION = 'REGISTRATION';
export const AUTHENTICATION = 'AUTHENTICATION';
export const ERROR_REGISTRATION = 'ERROR_REGISTRATION';
export const ON_GET_ARTICLE = 'ON_GET_ARTICLE';

export const onLogin = bool => ({ type: ON_LOGIN, bool });
export const onInitialState = res => ({ type: INITIAL_STATE, res });
export const onRegistration = res => ({ type: REGISTRATION, res });
export const onAuthentication = res => ({ type: AUTHENTICATION, res });
export const onErrorRegistration = () => ({ type: ERROR_REGISTRATION });
export const onGetArticle = article => ({ type: ERROR_REGISTRATION, article });
