import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import classes from './article.module.scss';

const ArticleContent = ({ item }) => {
  // eslint-disable-next-line no-console
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
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img className={classes.author__poster} src={image} alt="image" />
        </div>
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
