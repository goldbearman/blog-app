import React from 'react';
// OTHER LIBRARIES
import { format } from 'date-fns';
import PropTypes from 'prop-types';
// MATERIAL UI
import { Avatar } from '@material-ui/core';
import { Button, Grid } from '@mui/material';
// REACT ROUTER DOM
import { useHistory, useParams } from 'react-router-dom';
// CLASSNAMES
import cn from 'classnames';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../redux/asyncAction';

import classes from './article.module.scss';
import BlogService from '../../services/blog-service';

const blogService = new BlogService();

const ArticleContent = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const page = useSelector(state => state.page);
  const history = useHistory();
  const params = useParams();
  const {
    title, description, favoritesCount, tagList, author: { username, image }, createdAt, slug,
  } = item;

  const date = format(new Date(createdAt), 'MMMM dd, yyyy');
  console.log(typeof tagList[0]);

  const checkTagList = (arr) => {
    let showTagList = true;
    if (arr.length === 0) {
      showTagList = false;
    }
    if (arr.length === 1 && arr[0] === '') {
      showTagList = false;
    }
    return showTagList;
  };

  const inTagList = (arr) => {
    if (arr.length === 0) {
      return null;
    }
    const list = arr.map(tagName => (
      <div key={tagName} className={classes.tagList__tag}>{tagName}</div>
    ));
    return list;
  };

  const deleteArticle = () => {
    blogService.fetchDeleteArticle(slug, user.token).then(() => {
      dispatch(fetchArticles(page, user.token, history));
    });
  };
  const editArticle = () => {
    history.push('edit');
  };

  return (
    <Grid container>
      <Grid item xs={9}>
        <div className={classes.h1LikeCount}>
          <h1>{title}</h1>
          <div className={classes.likeCount}>{favoritesCount}</div>
        </div>
        <div />
        {checkTagList(tagList) && <div className={classes.tagList}>{inTagList(tagList)}</div>}
        <p>
          {description}
        </p>
      </Grid>
      <Grid item xs={3}>
        <div className={classes.authorBlog}>
          <div className={classes.authorBlog__data}>
            <div className={classes.authorName}>{username}</div>
            <div className={classes.authorDate}>{date}</div>
          </div>
          <Avatar alt="image" src={image} variant="circular" sx={{ width: 46, height: 46 }} />
        </div>
        {params.slug && username === user?.username
        && (
          <div className={classes.buttonSmallContainer}>
            <Button
              onClick={() => deleteArticle()}
              className={cn(classes.buttonSmall, classes.buttonDelete)}
            >
              Delete
            </Button>
            <Button
              onClick={() => editArticle()}
              className={cn(classes.buttonSmall, classes.buttonEdit)}
            >
              Edit
            </Button>
          </div>
        )
        }
      </Grid>
    </Grid>
  );
};

ArticleContent.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    favoritesCount: PropTypes.number,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    slug: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
    }),
  }),
};

ArticleContent.defaultProps = {
  item: {
    title: '',
    description: '',
    favoritesCount: 0,
    tagList: [''],
    slug: '',
    createdAt: 0,
  },
};

export default ArticleContent;
