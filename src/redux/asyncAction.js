import { onInitialState } from './actions';
import BlogService from '../services/blog-service';

const blogService = new BlogService();

export const fetchArticles = () => (dispatch) => {
  blogService.getAllArticles().then((res) => {
    // eslint-disable-next-line no-console
    console.log(res);
    dispatch(onInitialState(res));
    // setArrArticles(res.articles);
    // setArticlesCount(res.articlesCount);
  });


  // aviaSalesService.getId().then((idKey) => {
  //   getArrTickets(dispatch, idKey);
  // }).catch(dispatch(onInitialState({
  //   allTickets: [], filterArr: [], error: false, loading: false, stop: false,
  // })));
};
