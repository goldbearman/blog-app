import React, { useState } from 'react';
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
    title, description, favoritesCount, tagList, author: { username, image },
    createdAt, slug, favorited,
  } = item;

  // eslint-disable-next-line no-console
  console.log(favorited);
  // eslint-disable-next-line no-console
  console.log(item);

  const [redHeart, setRedHeart] = useState(params.slug ? !favorited : favorited);
  const [favoritesCountArticle, setFavoritesCountArticle] = useState(favoritesCount);

  const date = format(new Date(createdAt), 'MMMM dd, yyyy');

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

  const favoriteClick = (e) => {
    e.stopPropagation();
    setRedHeart(!redHeart);
    setFavoritesCountArticle(redHeart ? favoritesCountArticle - 1 : favoritesCountArticle + 1);
    // eslint-disable-next-line no-console
    console.log(redHeart);
    // dispatch(fetchSetFavorite(slug, user.token, history));
    if (redHeart)blogService.setUnFavorite(slug, user.token).catch(() => {});
    else blogService.setFavorite(slug, user.token).catch(() => {});
  };

  return (
    <Grid container>
      <Grid item xs={9}>
        <div className={classes.h1LikeCount}>
          <h1>{title}</h1>
          {/* eslint-disable-next-line max-len */}
          { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            // className={cn(classes.redHeart, { [classes.redHeart]: redHeart })}
            className={redHeart ? classes.redHeart : classes.likeCount}
            onClick={e => favoriteClick(e)}
          >
            {favoritesCountArticle}
          </div>
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
    favorited: PropTypes.bool,
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
    }),
  }),
};

ArticleContent.defaultProps = {
  item: {
    favorited: false,
    title: '',
    description: '',
    favoritesCount: 0,
    tagList: [''],
    slug: '',
    createdAt: 0,
  },
};

export default ArticleContent;
