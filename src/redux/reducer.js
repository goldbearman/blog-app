import {
  INITIAL_STATE, ON_LOGIN, REGISTRATION, ERROR_REGISTRATION,
  ON_GET_ARTICLE, ON_GET_ARTICLE_FALSE, AUTHENTICATION, ON_EDIT_USER, ON_EDIT_USER_NAME,
  ADD_ARTICLE, SET_PAGE, ERROR_AUTHENTICATION, ON_CHANGE_FIELD, ON_BUTTON_ACTIVE, ERROR_LOADING,
  ON_LOADING,
} from './actions';

const allState = {
  arrArticles: [],
  articlesCount: 0,
  page: 1,
  isLoggedIn: false,
  errorLoading: false,
  loading: false,
};

const reducer = (state = allState, action) => {
  switch (action.type) {
    case INITIAL_STATE: {
      const newState = Object.assign(
        {}, state, {
          arrArticles: action.res.articles,
          articlesCount: action.res.articlesCount,
          errorLoading: false,
          loading: true,
        },
      );
      return newState;
    }

    case ON_LOGIN: {
      const newStateSheap = Object.assign({}, state, { isLoggedIn: action.bool });
      return newStateSheap;
    }

    case ON_LOADING: {
      return { ...state, loading: action.bool };
    }

    case ON_BUTTON_ACTIVE: {
      return { ...state, buttonActive: action.name };
    }

    case SET_PAGE: {
      return { ...state, page: action.page };
    }

    case REGISTRATION: {
      const newStateFast = { ...state, button: 2, user: action.res };
      return newStateFast;
    }

    case AUTHENTICATION: {
      return {
        ...state, isLoggedIn: true, user: action.user,
      };
    }

    case ON_EDIT_USER: {
      return { ...state, user: action.res };
    }

    case ON_EDIT_USER_NAME: {
      const newState = { ...state };
      newState.user.name = action.name;
      return newState;
    }

    case ADD_ARTICLE: {
      const newState = { ...state };
      newState.user.name = action.name;
      return newState;
    }

    case ERROR_REGISTRATION: {
      return { ...state, errorRegistration: action.objError };
    }

    case ERROR_AUTHENTICATION: {
      return { ...state, errorAuthentication: action.bool };
    }

    case ERROR_LOADING: {
      return { ...state, errorLoading: true };
    }

    case ON_CHANGE_FIELD: {
      const newState = { ...state };
      if (newState.errorRegistration) {
        newState.errorRegistration[action.field] = undefined;
      }
      return newState;
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
