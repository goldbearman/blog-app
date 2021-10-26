import {
  INITIAL_STATE, ON_LOGIN, REGISTRATION, ERROR_REGISTRATION,
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
      const newStateFast = { ...state, button: 2 };
      return newStateFast;
    }

    case ERROR_REGISTRATION: {
      // eslint-disable-next-line no-console
      console.log('ERROR_REGISTRATION');
      return { ...state, errorRegistration: true };
    }

    default:
      return state;
  }
};

export default reducer;
