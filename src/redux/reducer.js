import {
  INITIAL_STATE, ON_LOGIN, REGISTRATION, ERROR_REGISTRATION,
  ON_GET_ARTICLE, ON_GET_ARTICLE_FALSE, AUTHENTICATION, ON_EDIT_USER, ON_EDIT_USER_NAME,
} from './actions';

const allState = {
  arrArticles: [],
  articlesCount: 0,
  page: 1,
  isLoggedIn: false,
};

const reducer = (state = allState, action) => {
  // const setArrTrueFalse = (boolean, obj) => {
  //   // eslint-disable-next-line guard-for-in,no-restricted-syntax
  //   for (const key in obj) {
  //     // eslint-disable-next-line no-param-reassign
  //     obj[key] = boolean;
  //   }
  //   return obj;
  // };

  console.log(action);

  switch (action.type) {
    case INITIAL_STATE: {
      console.log(action);
      const newState = Object.assign(
        {}, state, { arrArticles: action.res.articles, articlesCount: action.res.articlesCount },
      );
      return newState;
    }

    case ON_LOGIN: {
      const newStateSheap = Object.assign({}, state, { isLoggedIn: action.bool });
      return newStateSheap;
    }

    case REGISTRATION: {
      const newStateFast = { ...state, button: 2, user: action.res };
      return newStateFast;
    }

    case AUTHENTICATION: {
      console.log(action.res);
      return {
        ...state, isLoggedIn: true, user: action.res,
      };
    }

    case ON_EDIT_USER: {
      console.log(action.res);
      return { ...state, user: action.res };
    }

    case ON_EDIT_USER_NAME: {
      console.log(action.res);
      const newState = { ...state };
      newState.user.name = action.name;
      return newState;
    }

    case ERROR_REGISTRATION: {
      // eslint-disable-next-line no-console
      console.log('ERROR_REGISTRATION');
      return { ...state, errorRegistration: true };
    }

    case ON_GET_ARTICLE: {
      return { ...state, article: action.article, getArticle: true };
    }

    case ON_GET_ARTICLE_FALSE: {
      return { ...state, getArticle: false };
    }

    default:
      return state;
  }
};

export default reducer;
