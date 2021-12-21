import React, { memo, useState } from 'react';
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
import { asyncDeleteArticle, fetchSetFavorite, fetchSetUnFavorite } from '../../redux/asyncAction';


import classes from './article.module.scss';
import ConfirmDialog from '../confirm-dialog/confirm-dialog';

const ArticleContent = ({ item }) => {
  const dispatch = useDispatch();
  const { page, user, isLoggedIn } = useSelector(state => state);
  const history = useHistory();
  const params = useParams();

  const [open, setOpen] = useState(false);

  const {
    title, description, tagList, author: { username, image },
    createdAt, slug,
  } = item;
  let {
    favorited, favoritesCount,
  } = item;

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
    dispatch(asyncDeleteArticle(slug, page));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    if (value === 'delete') deleteArticle();
  };

  const editArticle = () => {
    history.replace('edit');
  };


  const favoriteClick = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      favorited = !favorited;
      if (favorited) {
        favoritesCount += 1;
      } else {
        favoritesCount -= 1;
      }
      if (favorited) {
        dispatch(fetchSetFavorite(slug));
      } else {
        dispatch(fetchSetUnFavorite(slug));
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={9}>
        <div className={classes.h1LikeCount}>
          <h1>{title}</h1>
          <div
            className={favorited ? classes.redHeart : classes.likeCount}
            onClick={e => favoriteClick(e)}
            role="presentation"
          >
            {favoritesCount}
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
            <ConfirmDialog open={open} onClose={handleClose} />
            <Button
              onClick={handleClickOpen}
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

export default memo(ArticleContent);
