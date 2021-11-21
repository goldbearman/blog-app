import React from 'react';
// OTHER LIBRARIES
import { format } from 'date-fns';
import PropTypes from 'prop-types';
// MATERIAL UI
import { Avatar } from '@material-ui/core';
import { Button } from '@mui/material';
// REACT BOOTSTRAP
import { Col, Row } from 'react-bootstrap';
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
  console.log(params);
  console.log(item);
  const {
    title, description, favoritesCount, tagList, author: { username, image }, createdAt, slug,
  } = item;
  console.log(createdAt);
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
      <div className={classes.tagList__tag}>{tagName}</div>
    ));
    return list;
  };

  const deleteArticle = () => {
    blogService.fetchDeleteArticle(slug, user.token).then(() => {
      console.log('deleteArticle');
      dispatch(fetchArticles(page, user.token, history));
    });
  };
  const editArticle = () => {
    history.push('edit');
  };

  return (
    <Row>
      <Col md={9}>
        <div className={classes.h1LikeCount}>
          <h1>{title}</h1>
          <div className={classes.likeCount}>{favoritesCount}</div>
        </div>
        <div />
        {checkTagList(tagList) && <div className={classes.tagList}>{inTagList(tagList)}</div>}
        <p>
          {description}
        </p>
      </Col>
      <Col md={3}>
        <div className={classes.author}>
          <div className={classes.author__data}>
            <div className={classes.authorName}>{username}</div>
            <div className={classes.authorDate}>{date}</div>
          </div>
          <Avatar alt="image" src={image} variant="circular" sx={{ width: 46, height: 46 }} />
        </div>
        {params.slug && username === user.username
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
      </Col>
    </Row>
  );
};

ArticleContent.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    favoritesCount: PropTypes.number,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.number,
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
    tagList: [],
    slug: '',
    createdAt: 0,
  },
};

export default ArticleContent;
