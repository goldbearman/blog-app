import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { Button } from '@mui/material';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './article.module.scss';
import BlogService from '../../services/blog-service';
import { fetchArticles } from '../../redux/asyncAction';

const blogService = new BlogService();

const ArticleContent = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const page = useSelector(state => state.page);
  const history = useHistory();
  console.log(item);
  const {
    title, description, favoritesCount, tagList, author: { username, image }, createdAt,
  } = item;
  const date = format(new Date(createdAt), 'MMMM dd, yyyy');

  const inTagList = (arr) => {
    if (arr.length === 0) return null;
    const list = arr.map(tagName => (
      <div className={classes.tagList__tag}>{tagName}</div>
    ));
    return list;
  };

  const deleteArticle = () => {
    blogService.fetchDeleteArticle(item.slug, user.token).then(() => {
      console.log('deleteArticle');
      dispatch(fetchArticles(page, user.token, history));
    });
  };
  const editArticle = () => {
    history.push(`/articles/${item.slug}/edit`);
  };

  return (
    <Row>
      <Col md={9}>
        <div className={classes.h1LikeCount}>
          <h1>{title}</h1>
          <div className={classes.likeCount}>{favoritesCount}</div>
        </div>
        <div />
        <div className={classes.tagList}>{inTagList(tagList)}</div>
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
        <Button
          onClick={() => deleteArticle()}
          className={cn(classes.buttonNavBar, classes.buttonLogOut)}
        >
          Delete
        </Button>
        <Button
          onClick={() => editArticle()}
          className={cn(classes.buttonNavBar, classes.buttonLogOut)}
        >
          Edit
        </Button>
      </Col>
    </Row>
  );
};

ArticleContent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
};

ArticleContent.defaultProps = {
  item: {},
};

export default ArticleContent;
