import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchArticles } from '../../redux/asyncAction';

const GetArticlesComponent = ({ getArticles }) => {
  console.log('GetArticlesComponent ');
  useEffect(() => {
    console.log('useEffect');
    getArticles();
  });

  // return <Redirect to="/articles" />;
  return <p>Hi</p>;
};

GetArticlesComponent.propTypes = {
  getArticles: PropTypes.func,
};
GetArticlesComponent.defaultProps = {
  getArticles: () => {},
};

const mapDispathToProps = dispatch => ({
  getArticles: () => dispatch(fetchArticles()),
});

const mapStateToProps = state => ({
  counter: state,
});
export default connect(mapStateToProps, mapDispathToProps)(GetArticlesComponent);
