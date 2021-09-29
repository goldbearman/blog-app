import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import classes from './flight.module.scss';

const Article = () => (
  <Container>
    <Row>
      <Col md={4}>
          Привет
      </Col>
      <Col md={8}>
          Медвед
      </Col>
    </Row>
  </Container>
);

export default Article;
