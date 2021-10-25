import {
  INITIALSTATE,
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
    // case ON_CHEKCBOX:
    //   return checkState(action.number, state);

    case INITIALSTATE: {
      // eslint-disable-next-line max-len
      const newState = Object.assign({}, state, { arrArticles: action.articles, articlesCount: action.articlesCount });
      return newState;
      // setArrArticles(res.articles);
      // setArticlesCount(res.articlesCount);
    }

    // case CLICK_CHEAPEST: {
    //   const newStateSheap = { ...state, button: 1 };
    //   return sortArr(newStateSheap);
    // }
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
