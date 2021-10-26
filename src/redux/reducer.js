import {
  INITIAL_STATE, ON_LOGIN,
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
    //
    // case CLICK_FASTEST: {
    //   const newStateFast = { ...state, button: 2 };
    //   return sortArr(newStateFast);
    // }
    //
    // case FIVE_MORE_TICKETS: {
    //   const newStateFiveMoreTickets = { ...state };
    //   newStateFiveMoreTickets.numberFlight += 5;
    //   return (newStateFiveMoreTickets);
    // }

    default:
      return state;
  }
};

export default reducer;
