import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { format } from 'date-fns';
import classes from './article.module.scss';


const Article = (item) => {
  // eslint-disable-next-line no-console
  console.log(item);
  const {
    item: {
      title, body, favoritesCount, tagList, author: { username, image }, createdAt,
    },
  } = item;
  const date = format(new Date(createdAt), 'MMMM dd, yyyy');
  // eslint-disable-next-line no-console
  console.log(date);

  const inTagList = (arr) => {
    if (arr.length === 0) return null;
    const list = arr.map(tagName => (
      <div className={classes.tagList__tag}>{tagName}</div>
    ));
    return list;
  };

  return (
    <Container className={classes.articleContainer}>
      <Row>
        <Col md={8}>
          <div className={classes.h1LikeCount}>
            <h1>{title}</h1>
            <div className={classes.likeCount}>{favoritesCount}</div>
          </div>
          <div />
          <div className={classes.tagList}>{inTagList(tagList)}</div>
          <p>
            {body}
          </p>
        </Col>
        <Col md={4}>
          <div className={classes.autor}>
            <div className={classes.autor__data}>
              <div className={classes.autorName}>{username}</div>
              <div className={classes.autorDate}>{date}</div>
            </div>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img className={classes.autor__poster} src={image} alt="image" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};


export default Article;
